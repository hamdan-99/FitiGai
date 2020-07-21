'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const serviceSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },

  owner: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },

  /**
   * Price is store in cent
   * so 1€ is store like this: 100
   */
  price: {
    type: Number,
  },

  address: {
    type: String,
  },

  location: {
    type: String,
  },
})

module.exports = mongoose.model('Searches', serviceSchema)
