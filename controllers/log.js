const db = require("../config/database");
const Log = db.log;

// OK
exports.findAll = async (req, res) => {
  try {
    const logs = await Log.findAll()
    res.send(logs)
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Log."
    });
  }

};
