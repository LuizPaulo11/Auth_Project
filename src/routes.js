const express = require('express');

const userController = require('./controller/userController');
const authController = require('./controller/authController');

const authMiddleware = require('./middlewares/authMiddleware');
const { validateUser } = require('./middlewares/validationsMiddleware');

const routes = express.Router()

//authController
routes.post('/auth/register', validateUser, authController.register);
routes.post('/auth/login', validateUser, authController.login);

// userController
routes.get('/users/:id', userController.seeProfile); // sera atualizada para conseguir somente visualizar proprio perfil
routes.put('/users/:id/name', authMiddleware, userController.updateName);
routes.put('/users/:id/password', validateUser, authMiddleware, userController.updatePassword);
routes.delete('/users/:id', authMiddleware, userController.deleteAccount);

// Posts










/*
routes.get('/posts/feed', );
routes.get('/posts/my-posts', );
routes.get('posts/:id', );
routes.post('/posts', );
routes.put('/posts/:id', );
routes.delete('/posts/:id', );
*/

module.exports = routes

