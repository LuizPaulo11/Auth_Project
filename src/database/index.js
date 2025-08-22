const Sequelize = require('sequelize');
const dbconfig = require('../config/database');

const User = require('../models/User');
const Role = require('../models/Role');
const Post = require('../models/Post');

const connection = new Sequelize(dbconfig);

// Inicializar os models
User.init(connection);
Role.init(connection);
Post.init(connection);

User.associate(connection.models);
Role.associate(connection.models);
Post.associate(connection.models);

module.exports = connection