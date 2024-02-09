var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

// mongoose.connect("mongodb+srv://freefiregaming012:jadhav@123@special-day.ipnyxls.mongodb.net/special-day?retryWrites=true&w=majority")

mongoose.connect('mongodb+srv://freefiregaming012:jadhav%40123@special-day.ipnyxls.mongodb.net/special-day?retryWrites=true&w=majority')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  urlCode: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("record", userSchema);
