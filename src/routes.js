const express = require('express');

const userController = require('./controller/userController');
const authController = require('./controller/authController');

const authMiddleware = require('./middlewares/authMiddleware');

const routes = express.Router()

// userController
routes.get('/users/:id', authMiddleware, userController.seeProfile);
routes.put('/users/:id/name', authMiddleware, userController.updateName);
routes.put('/users/:id/password', authMiddleware, userController.updatePassword);
routes.delete('/users/:id', authMiddleware, userController.deleteAccount);



module.exports = routes