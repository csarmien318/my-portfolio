require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

const app = express();

const routes = require("./routes/api");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/all_testing", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected successfully!!!!!!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://api.weatherapi.com"],
    credentials: true,
  })
);

// HTTP request logger

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));

  // app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "my-portfolio", "build", "index.html"));
  // });
} else {
  app.get("/", (req, res) => {
    res.send("Api running");
  });
}

app.use(morgan("tiny"));
app.use("/api", routes);

app.listen(
  process.env.PORT,
  console.log(`Server is starting at ${process.env.PORT}`)
);
