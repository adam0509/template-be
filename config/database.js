const Sequelize = require("sequelize");

const config = {
    HOST: process.env.HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    dialect: "mysql",
    pool: {
        max: 5, // 最大连接数
        min: 0, // 最小连接数
        acquire: 30000,
        idle: 10000 // 连接在释放之前的最长空闲时间（毫秒）
    }
}

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
});


const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// 在此引入模型
db.admin = require("../models/admin")(sequelize, Sequelize)
db.log = require("../models/log")(sequelize, Sequelize)


// 在此处理模型关系
// User 1:n Order
// db.user.hasMany(db.order);
// db.order.belongsTo(db.user);

// Meal 和 Ingredient 之间的关系 (多对多)
// db.meal.belongsToMany(db.ingredient, { through: db.mealIngredient, foreignKey: 'mealId' });
// db.ingredient.belongsToMany(db.meal, { through: db.mealIngredient, foreignKey: 'ingredientId' });

module.exports = db