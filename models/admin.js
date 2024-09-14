const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define("admin", {
    adminId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    adminName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    avatar: {
        type: Sequelize.STRING,
        allowNull: true
    }
  });

  Admin.beforeCreate(async (admin) => {
    admin.password = await bcrypt.hash(admin.password, 10);
  });

  return Admin;
};