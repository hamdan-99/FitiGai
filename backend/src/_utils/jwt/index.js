/* eslint-disable no-undef */
'use strict'

const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET || 'secret'

module.exports = {
  signToken: (data) => {
    return jwt.sign(data, secret, {
      expiresIn: '7d',
    })
  },
}
