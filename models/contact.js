const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ContactSchema = new Schema({
  username: String,
  company: String,
  email: String,
  message: String,
});

const Contact = mongoose.model("Contact", ContactSchema);

const data = {
  username: "John Smith",
  company: "Testing Inc.",
  email: "jsmith@testing.com",
  message: "This is a test message from John Smith.",
};

const newContact = new Contact(data);

module.exports = Contact;
