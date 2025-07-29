const Sequelize = require('sequelize');
const dbconfig = require('../config/database');

const User = require('../models/User');
const Role = require('../models/Role');

const connection = new Sequelize(dbconfig);

User.init(connection)

module.exports = connection