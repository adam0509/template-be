module.exports = app => {
    const admin = require("../controllers/admin");
    const authenticateToken = require("../middlewares/auth");
    const log = require("../middlewares/log");
    const upload = require('../middlewares/upload')

    var router = require("express").Router();

    router.get("/", authenticateToken, admin.findAll);
    router.put("/:id", authenticateToken, upload.single('avatar'), log, admin.update);
    router.post("/", authenticateToken, upload.single('avatar'), log, admin.create);
    router.post("/login", admin.login);
    router.delete("/:id", authenticateToken, log, admin.delete);


    app.use('/api/admins', router);
};