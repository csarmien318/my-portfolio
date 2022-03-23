require("dotenv").config();

const express = require("express");
const router = express.Router();
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

const Contact = require("../models/contact");
const Songs = require("../models/songs");
const Login = require("../models/login");

// Routes
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

router.get("/songs", (req, res) => {
  Songs.find({})
    .then((songsData) => {
      console.log("songsData: ", songsData);
      res.json(songsData);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
});

// START: *Code from YouTube video* Not finished - was copied.
// TODO: Make collection in MongoDB to store jwt's
//       create get jwt's from MongoDB
//       create logout route to delete tokens

// let refreshTokens = []

// app.post('/token', (req, res) => {
//   const refreshToken = req.body.token
//   if (refreshToken == null) return res.sendStatus(401)
//   if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403)
//     const accessToken = generateAccessToken({ name: user.name })
//     res.json({ accessToken: accessToken })
//   })
// })

// app.delete('/logout', (req, res) => {
//   refreshTokens = refreshTokens.filter(token => token !== req.body.token)
//   res.sendStatus(204)
// })

// END

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Login.findOne({ username });

  if (user && (await user.password) === password) {
    const isUser = { name: req.body.username };
    const accessToken = generateAccessToken(isUser);
    const refreshToken = jwt.sign(isUser, process.env.REFRESH_SECRET_TOKEN);

    res.json({
      username: user.username,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } else {
    res.status(401).send("Invalid Email or Password");
  }
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {
    expiresIn: "2h",
  });
}

router.post("/save", (req, res) => {
  const data = req.body;

  const newContact = new Contact(data);

  // .save()
  newContact.save((error) => {
    if (error) {
      res
        .status(500)
        .json({ msg: "Sorry, an internal server error has occurred" });
      return;
    }

    return res.json({
      msg: "Data has been saved!",
    });
  });
});

module.exports = router;
