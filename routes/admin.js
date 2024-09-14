module.exports = app => {
    const admin = require("../controllers/admin");
    const authenticateToken = require("../middlewares/auth");
    const log = require("../middlewares/log");
    const upload = require('../middlewares/upload')

    var router = require("express").Router();

    router.get("/", admin.findAll);
    router.put("/:id", upload.single('avatar'), admin.update);
    router.post("/", upload.single('avatar'), admin.create);
    router.post("/login", admin.login);
    router.delete("/:id", admin.delete);


    app.use('/api/admins', router);
};