'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const { create, read } = require('./queries')

module.exports = {
  addService: async (data) => {
    if (!ObjectId.isValid(data.owner)) {
      throw new Error('Owner id is incorrect')
    }

    const response = await create({
      owner: data.owner,
      title: data.title,
      description: data.description,
      price: data.price,
      address: data.address,
      location: data.location,
    })

    return response
  },

  // retrieveCoachServices: async (coachId) => {
  //   const response = await read({ owner: coachId })

  //   return response
  // },
}
