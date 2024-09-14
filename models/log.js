module.exports = (sequelize, Sequelize) => {
    const Log = sequelize.define("log", {
        logId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        entity: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        peopleId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        operationType: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        details: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
    });

    return Log;
};