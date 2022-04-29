require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const app = express();

const routes = require("./routes/api");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/all_testing", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected successfully!!!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://api.weatherapi.com",
      "https://csarmiento-fullstack-portfolio.herokuapp.com",
    ],
    credentials: true,
  })
);

app.use(morgan("tiny"));
app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is running");
  });
}

app.listen(
  process.env.PORT,
  console.log(`Server is starting at ${process.env.PORT}`)
);
