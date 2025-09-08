const express = require('express');

const UserController = require('./controller/UserController');
const Auth = require('./middlewares/AuthMiddleware');

const routes = express.Router()



routes.post('/CriarNovoUsuario', UserController.NewUserComum)
routes.get('/TodosUsuarios',  UserController.GetAllUsers)
routes.post('/LoginUsuario', Auth, UserController.Login)



module.exports = routes