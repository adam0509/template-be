const express = require("express");
const cors = require("cors");
require('dotenv').config({ path: '.env' })
const app = express();

const path = require('path');


var corsOptions = {
    origin: "http://localhost:5173"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// 让图片文件夹成为静态资源目录
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = require("./config/database");
// db.sequelize.sync({ force: true })
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });


// 在此引入所有路由
require("./routes/admin")(app);
require("./routes/log")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});