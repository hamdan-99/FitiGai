'use strict'

const mongoose = require('mongoose')

const { create, read } = require('./queries')

module.exports = {
  /**
   * Create a service
   */
  createSearch: async (req, res) => {
    try {
      // TODO: include the currency
      const { owner, title, description, price, address, location } = req.body
      /**
       * Check if the coach value is a valid mongoID
       */
      // if (!ObjectId.isValid(owner)) {
      //   throw new Error('Coach is not a valid id')
      // }

      /**
       * Check is coach ID is a real user in DB
       */

      const newSearcheseData = {
        _id: new mongoose.Types.ObjectId(),
        owner: owner,
        title: title,
        description: description,
        price: price,
        address: address,
        location: location,
        // currency: curr[0]._id,
      }

      const newService = await create(newSearcheseData)
      res.status(201).json(newService)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in service creation',
        debug_message: error.message,
      })
    }
  },

  /**
   * get all services
   */
  readSearch: async (req, res) => {
    try {
      const services = await read()
      res.status(201).json(services)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in getting all offers',
        debug_message: error.message,
      })
    }
  },

  /**
   * Find service by id
   **/
  // getServiceById: async (req, res) => {
  //   try {
  //     const {
  //       params: { id },
  //     } = req

  //     /**
  //      * Check if the coach value is a valid mongoID
  //      */
  //     if (!ObjectId.isValid(id)) {
  //       throw new Error('ID is not valid')
  //     }

  //     const service = await read({ _id: id })

  //     if (!service || !service.length) {
  //       throw new Error('No service corresponding with this id')
  //     }

  //     res.status(201).json(service[0])
  //   } catch (error) {
  //     res.status(500).json({
  //       public_message: 'Error in getting all offers',
  //       debug_message: error.message,
  //     })
  //   }
  // },

  /** // TODO: rename this to service
   * Search offers with query
   **/
  // searchOffers: async (req, res) => {
  //   try {
  //     let services = null
  //     const { query } = req.body
  //     if (!query) {
  //       services = await read()
  //     } else {
  //       services = await searchSearches(query)
  //     }
  //     res.status(201).json(services)
  //   } catch (error) {
  //     res.status(500).json({
  //       public_message: 'Error in searching services',
  //       debug_message: error.message,
  //     })
  //   }
  // },
}
