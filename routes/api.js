require("dotenv").config();

const express = require("express");
const router = express.Router();
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const Contact = require("../models/contact");
const Songs = require("../models/songs");
const Users = require("../models/users");
const Tokens = require("../models/token");

// Login and save refreshToken in MongoDB
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const storedUser = await Users.findOne({ username });
  if (Tokens.findOne({ username })) {
    await Tokens.deleteOne({ username }).then(() => {
      res;
    });
  }

  if (storedUser && (await storedUser.password) === password) {
    await Users.updateOne(
      { username: storedUser.username },
      { $inc: { numLogins: 1 } }
    ).then(() => {
      res;
    });

    const user = { username: username };
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN);

    const saveToken = { username: username, refreshToken: refreshToken };
    const newToken = new Tokens(saveToken);
    await newToken.save((error) => {
      if (error) {
        res
          .status(500)
          .json({ msg: "Sorry, an internal server error has occurred." });
      }
    });
    res
      .cookie("user", user, {
        origin: "http://localhost:3000",
        sameSite: "strict",
        secure: true,
      })
      .cookie("accessToken", accessToken, {
        expires: new Date(new Date().getTime() + 1800 * 1000),
        origin: "http://localhost:3000",
        sameSite: "strict",
        secure: true,
        httpOnly: true,
      })
      .cookie("refreshToken", refreshToken, {
        expires: new Date(new Date().getTime() + 31557600000),
        origin: "http://localhost:3000",
        sameSite: "strict",
        secure: true,
        httpOnly: true,
      })
      .cookie("authedSession", true, {
        expires: new Date(new Date().getTime() + 1800 * 1000),
        origin: "http://localhost:3000",
        sameSite: "strict",
        secure: true,
      })
      .cookie("isAuthed", true, {
        expires: new Date(new Date().getTime() + 31557600000),
        origin: "http://localhost:3000",
        sameSite: "strict",
        secure: true,
      })
      .status(202)
      .json({ user });
  } else {
    res.sendStatus(401);
  }
});

// Logout
router.get("/logout", (req, res) => {
  Tokens.deleteOne(req.body.username)
    .then(() => {
      res
        .clearCookie("user")
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .clearCookie("authedSession")
        .clearCookie("isAuthed")
        .json("Logout successful");
    })
    .catch((error) => {
      console.log("Error: " + error);
    });
  res;
});

router.delete("/clear-cookies", (req, res) => {
  res
    .clearCookie("user")
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .clearCookie("authedSession")
    .clearCookie("isAuthed")
    .send("logout");
});

// Generate new access token upon expiration
router.post("/auth", async (req, res) => {
  const tokens = req.headers.cookie;
  if (!tokens) return;

  const refreshToken = tokens?.split("refreshToken=")[1]?.split(";")[0];
  if (!refreshToken) return res.status(403).send();

  const storedToken = await Tokens.findOne({ refreshToken });
  if (!storedToken) return res.status(403).send();

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) return res.status(403);
    user = { username: req.body.username };
    const accessToken = generateAccessToken(user);
    res
      .cookie("accessToken", accessToken, {
        expires: new Date(new Date().getTime() + 1800 * 1000),
        origin: "http://localhost:3000",
        sameSite: "strict",
        secure: true,
        httpOnly: true,
      })
      .cookie("authedSession", true, {
        expires: new Date(new Date().getTime() + 1800 * 1000),
        origin: "http://localhost:3000",
        sameSite: "strict",
        secure: true,
      })
      .status(200)
      .json({ accessToken: accessToken });
  });
});

// Get song data
router.get("/songs", async (req, res) => {
  await Songs.find({})
    .then((songsData) => {
      console.log(songsData);
      res.json(songsData);
    })
    .catch(() => {
      res.status(500).json({ msg: "Error retrieving songs" });
    });
});

// Save contact data
router.post("/save", async (req, res) => {
  const data = req.body;
  console.log(data);

  const newContact = new Contact(data);

  newContact.save((error) => {
    if (error) {
      res
        .status(500)
        .json({ msg: "Sorry, an internal server error has occurred" });
    }

    res.json({
      msg: "Data has been saved!",
    });
  });
});

// Generate new access token and set expiration on token
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN, {
    expiresIn: "86400s",
  });
}

// Require authentication
// async function authenticateToken(req, res, next) {
//   const accessToken = req.headers?.cookie
//     ?.split("accessToken=")[1]
//     ?.split(";")[0];
//   const refreshToken = req.headers?.cookie
//     ?.split("refreshToken=")[1]
//     .split(";")[0];
//   if (refreshToken == undefined && accessToken == undefined) {
//     res.sendStatus(403);
//     return;
//   }
//   const token = accessToken;
//   const user = await Tokens.findOne({ refreshToken: refreshToken });
//   if (token == null || !user) {
//     console.log("authenticateToken error");
//     res.sendStatus(401);
//     return;
//   }

//   jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
//     console.log("Logging error: ", err);
//     if (err) {
//       res.sendStatus(403);
//       return;
//     }
//     req.user = user;
//     next();
//   });
// }

module.exports = router;
