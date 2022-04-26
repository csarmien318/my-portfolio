const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const ContactSchema = new Schema({
  username: String,
  company: String,
  email: String,
  message: String,
});

// Model
const Contact = mongoose.model("Contact", ContactSchema);

// Saving data to our mongo database
const data = {
  username: "John Smith",
  company: "Testing Inc.",
  email: "jsmith@testing.com",
  message: "This is a test message from John Smith.",
};

const newContact = new Contact(data); // instance of the model

module.exports = Contact;
