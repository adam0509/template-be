const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const db = require("../config/database");
const Admin = db.admin;

// 创建管理员
exports.create = async (req, res) => {
    try {
        const { adminName, password } = req.body

        const avatar = req.file ? req.file.filename : null // 设置文件的名称存入image

        const adminData = {
            adminName,
            password,
            avatar
        };


        const admin = await Admin.create(adminData);
        res.send(admin);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Admin."
        });
    }
};

// 登录管理员
// 传入用户名userName, 密码password
exports.login = async (req, res) => {
    try {
        // 确认是否存在该用户
        const admin = await Admin.findOne({ where: { adminName: req.body.adminName } });
        if (!admin) {
            return res.status(404).send({ message: "Admin Not found." });
        }

        // 比对密码
        const passwordIsValid = await bcrypt.compare(req.body.password, admin.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid Password!" });
        }

        // 密码正确则生成token发回：accessToken
        const token = jwt.sign({ id: admin.adminId }, SECRET_KEY, { expiresIn: 86400 }); // 24 hours

        res.status(200).send({ admin: admin, accessToken: token });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const admins = await Admin.findAll()
        res.send(admins)
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the User."
        });
    }

};


// 修改管理员
exports.update = async (req, res) => {
    try {
        const password = await bcrypt.hash(req.body.password, 10);
        const avatar = req.file ? req.file.filename : null // 设置文件的名称存入image
        const { adminName } = req.body

        // 如果上传了新图片，并且已有旧图片，则删除旧图片
        const admin = await Admin.findByPk(req.params.id);

        if (!admin) {
            return res.status(404).send({
                message: "Admin not found",
            });
        }
        if (avatar && admin.avatar) {
            const oldImagePath = path.join(__dirname, '..', 'uploads', admin.avatar);
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error("Failed to delete old image:", err);
                }
            });
        }

        const adminData = {
            adminName,
            password,
            avatar
        };
        await Admin.update(adminData, {
            where: {
                adminId: req.params.id
            }
        });
        res.send({ message: "OK" });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    }
};

// 删除管理员
exports.delete = async (req, res) => {
    try {
        await Admin.destroy({
            where: {
                adminId: req.params.id
            }
        });
        res.send({ message: "OK" });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    }
};