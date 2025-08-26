const express = require('express');

const UserController = require('./controller/UserController');

const routes = express.Router()

routes.post('/test', UserController.NewUserComum)
routes.get('/lll', UserController.GetAllUsers)

module.exports = routes