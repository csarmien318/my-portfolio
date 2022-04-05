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
const Token = require("../models/token");
const { application } = require("express");

// Login and save refreshToken in MongoDB
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const isUser = await Users.findOne({ username });

  if (isUser && (await isUser.password) === password) {
    const user = { username: username };

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET_TOKEN);

    const saveToken = { username: username, refreshToken: refreshToken };
    const newToken = new Token(saveToken);
    await newToken.save((error) => {
      if (error) {
        res
          .status(500)
          .json({ msg: "Sorry, an internal server error has occurred." });
      }
    });
    res
      .cookie("accessToken", accessToken, {
        expires: new Date(new Date().getTime() + 86400 * 1000),
        origin: "http://localhost:3000",
        sameSite: "none",
        secure: true,
        httpOnly: true,
      })
      .cookie("refreshToken", refreshToken, {
        expires: new Date(new Date().getTime() + 31557600000),
        origin: "http://localhost:3000",
        sameSite: "none",
        secure: true,
        httpOnly: true,
      })
      .cookie("authedSession", true, {
        expires: new Date(new Date().getTime() + 86400 * 1000),
        origin: "http://localhost:3000",
        sameSite: "none",
        secure: true,
      })
      // .cookie("refreshTokenID", true, {
      //   expires: new Date(new Date().getTime() + 31557600000),
      //   origin: "http://localhost:3000",
      //   sameSite: "none",
      //   secure: true,
      // })
      .status(202)
      .json({ user });
  } else {
    res.status(401).send("Invalid Email or Password");
  }
});

// Logout
router.get("/logout", async (req, res) => {
  await Token.deleteOne(req.body.username)
    .then(() => {
      res.json("Logout successful");
    })
    .catch((error) => {
      console.log("Error: " + error);
    });
  res;
});

router.delete("/clear-cookies", (req, res) => {
  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .clearCookie("authedSession")
    .clearCookie("authedToken")
    .send("logout");
});

// Update refresh token in MongoDB
// TODO: Update below to update refresh token generated when token expires
router.post("/token", async (req, res) => {
  const { username, refreshToken } = req.body;
  const user = await Token.findOne({ username });
  console.log(user);

  if (!user) {
    const newToken = new Token(req.body);
    newToken.save((error) => {
      if (error) {
        res
          .status(500)
          .json({ msg: "Sorry, an internal server error has occurred." });
      }

      res.json({
        msg: "User authenticated",
      });
    });
  } else {
    const query = { username: username };
    const update = {
      $set: { username: username, refreshToken: refreshToken },
    };
    const options = {};
    Token.updateOne(query, update, options)
      .then(() => {
        res.status(200).json("Renew auth success");
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  }
});

// Generate new access token upon expiration
router.post("/auth", async (req, res) => {
  const tokens = req.headers.cookie;
  const refreshToken = tokens.split("=")[1];
  console.log(refreshToken);
  if (refreshToken == undefined) return res.sendStatus(401);
  if (!(await Token.findOne({ refreshToken }))) return res.sendStatus(403);
  console.log("Refresh token was found in mongoDB: " + refreshToken);

  jwt.verify(refreshToken, process.env.REFRESH_SECRET_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    user = { username: req.body.username };
    const accessToken = generateAccessToken(user);
    res
      .cookie("accessToken", accessToken, {
        expires: new Date(new Date().getTime() + 86400 * 1000),
        origin: "http://localhost:3000",
        sameSite: "none",
        secure: true,
        httpOnly: true,
      })
      .cookie("authedSession", true, {
        expires: new Date(new Date().getTime() + 86400 * 1000),
        origin: "http://localhost:3000",
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({ accessToken: accessToken });
  });
});

// Get song data
router.get("/songs", authenticateToken, (req, res) => {
  Songs.find({})
    .then((songsData) => {
      console.log("songsData: ", songsData);
      res.json(songsData);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
});

// Save contact info
router.post("/save", authenticateToken, (req, res) => {
  const data = req.body;
  console.log(data);

  const newContact = new Contact(data);

  newContact.save((error) => {
    if (error) {
      res
        .status(500)
        .json({ msg: "Sorry, an internal server error has occurred" });
      // return;
    }

    res.json({
      msg: "Data has been saved!",
    });
  });
});

// Display contact data in backend route
router.get("/", (req, res) => {
  Contact.find({})
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
});

// Generate new access token and set expiration on token
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {
    expiresIn: "86400s",
  });
}

// Require authentication router.get("/route", authenticateToken, (req, res) => {...})
async function authenticateToken(req, res, next) {
  console.log(req.body);
  const accessToken = req.headers.cookie.split("accessToken=")[1];
  const refreshToken = req.headers.cookie
    .split("refreshToken=")[1]
    .split(";")[0];
  if (accessToken == undefined || refreshToken == undefined)
    return res.sendStatus(401);
  const token = accessToken.split(";")[0];
  const user = await Token.findOne({ refreshToken: refreshToken });
  if (token == null || !user) {
    return res.sendStatus(401).json({ msg: "Unauthorized" });
  }

  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
    console.log("Logging error: ", err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
