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
  username: "Test",
  company: "Testing",
  email: "test@testing.com",
  message: "Test",
};

const newContact = new Contact(data);

module.exports = Contact;
