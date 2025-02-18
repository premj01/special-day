var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
require('dotenv').config();

mongoose.connect(process.env.DBURL)

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
