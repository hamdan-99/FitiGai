'use strict'

const searchesRouter = require('express').Router()

const { createSearch, readSearch } = require('../controllers/searches')

searchesRouter.get('/', readSearch).post('/', createSearch)
// TODO: use the right controller

module.exports = searchesRouter
