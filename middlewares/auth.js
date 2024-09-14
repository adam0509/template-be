const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY; // 这里替换为你实际使用的秘钥

// 前端应发来的头部：bearer <token>
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401); // 未授权

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // 禁止访问
    req.user = user; // 将用户信息保存到 req 对象中，以便在下一个中间件或路由中使用
    next(); // 继续处理请求
  });
};

module.exports = authenticateToken;
