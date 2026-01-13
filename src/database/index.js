const Sequelize = require('sequelize');
const dbconfig = require('../config/database');

const User = require('../models/User');
const Role = require('../models/Role');
const Post = require('../models/Post');
const Permission = require('../models/Permission');

const PermissionRoles = require('../models/PermissionRoles');
const UserRole = require('../models/UserRole')


const connection = new Sequelize(dbconfig);

User.init(connection);
Role.init(connection);
Post.init(connection);
Permission.init(connection);

PermissionRoles.init(connection);
UserRole.init(connection);


User.associate(connection.models);
Role.associate(connection.models);
Post.associate(connection.models);
Permission.associate(connection.models);

PermissionRoles.associate(connection.models);
UserRole.associate(connection.models);


module.exports = connection