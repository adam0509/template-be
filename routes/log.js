module.exports = app => {
    const log = require("../controllers/log");
    const authenticateToken = require("../middlewares/auth");
  
    var router = require("express").Router();
  
    router.get("/", authenticateToken, log.findAll);  
  
    app.use('/api/logs', router);
  };