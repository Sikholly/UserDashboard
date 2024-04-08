// 引入必要的模块
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // 引入 cors 模块

// 创建 Express 应用
const app = express();
const PORT = process.env.PORT || 3000;

// 模拟用户数据库
const users = [
    {
        id: 1,
        username: 'test',
        password: 'test'
    },
    {
        id: 2,
        username: 'user',
        password: 'user'
    }
];

// 使用 CORS 中间件
app.use(cors()); // 允许所有来源的请求

// 设置 bodyParser 中间件，用于解析请求体
app.use(bodyParser.json());

// 登录接口
app.post('/api/login', (req, res) => {
    // 从请求体中获取用户名和密码
    const { username, password } = req.body;

    // 在模拟的用户数据库中查找用户
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // 用户验证成功，生成 JWT 令牌
        jwt.sign({ user }, 'secretkey', (err, token) => {
            if (err) {
                res.status(500).json({ message: '生成令牌失败' });
            } else {
                res.json({ token });
            }
        });
    } else {
        // 用户验证失败
        res.status(401).json({ message: '用户名或密码错误' });
    }
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});
