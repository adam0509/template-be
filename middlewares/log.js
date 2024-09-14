// 需要用前端body传：adminId, operationType, entity, details
const logOperation = async (req, res, next) => {
    const db = require("../config/database");
    const Log = db.log;
    try {
        const { entity, peopleId, operationType, details } = req.body;

        await Log.create({
            entity: entity,
            peopleId: peopleId,
            operationType: operationType,
            details,
        });

        next();
    } catch (error) {
        console.error('Failed to log operation:', error);
        next(error);
    }
};

module.exports = logOperation;
