module.exports = app => {
    var router = require("express").Router();
    const path = require('path');
    // 前端获取图片的接口
    router.get("/:filename", (req, res) => {
        const { filename } = req.params;
        const imagePath = path.join(__dirname, '..', 'uploads', filename);
        res.sendFile(imagePath);
    });


    app.use('/api/uploads', router);
};