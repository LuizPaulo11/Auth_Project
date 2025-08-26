const Sequelize = require('sequelize');
const dbconfig = require('../config/database');

const User = require('../models/User');
const Role = require('../models/Role');
const Post = require('../models/Post');
const Permissions = require('../models/Permissions');
const PermissionsRoles = require('../models/PermissionsRoles');
const UserRoles = require('../models/UserRoles')


const connection = new Sequelize(dbconfig);

User.init(connection);
Role.init(connection);
Post.init(connection);
Permissions.init(connection);
PermissionsRoles.init(connection);
UserRoles.init(connection);


User.associate(connection.models);
Role.associate(connection.models);
Post.associate(connection.models);
Permissions.associate(connection.models);
PermissionsRoles.associate(connection.models);
UserRoles.associate(connection.models);


module.exports = connection