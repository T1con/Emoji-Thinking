const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const USERS_FILE = path.join(__dirname, 'users.json');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'phần_chính')));

// Trang chủ
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'phần_chính', 'index.html'));
});

// API: Đăng ký tài khoản
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Thiếu thông tin.' });
  }
  let users = [];
  if (fs.existsSync(USERS_FILE)) {
    users = JSON.parse(fs.readFileSync(USERS_FILE));
  }
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ message: 'Tên tài khoản đã tồn tại.' });
  }
  users.push({ username, password });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  res.json({ message: 'Đăng ký thành công!' });
});

// API: Đăng nhập
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Thiếu thông tin.' });
  }
  let users = [];
  if (fs.existsSync(USERS_FILE)) {
    users = JSON.parse(fs.readFileSync(USERS_FILE));
  }
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu.' });
  }
  res.json({ message: 'Đăng nhập thành công!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 