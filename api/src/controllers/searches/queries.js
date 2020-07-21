'use strict'

const Searches = require('../../models/searches')
const mongoose = require('mongoose')
module.exports = {
  create(data) {
    const { owner, title, description, price, address, location } = data

    const newSearches = new Searches({
      _id: new mongoose.Types.ObjectId(),
      owner,
      title,
      description,
      price,
      address,
      location,
    })

    return newSearches.save()
  },

  read(query = {}) {
    return Searches.find(query)
  },

  async searchSearchess(query) {
    const q = Searches.find({ $text: { $search: query } })
    const Searches = await q.exec().then((results) => {
      return results
    })
    return Searches
  },
}
