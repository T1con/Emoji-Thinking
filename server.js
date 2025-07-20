const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'phần_chính')));

const USERS_FILE = path.join(__dirname, 'phần_chính', 'users.json');

// Helper: đọc danh sách user
async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}
// Helper: ghi danh sách user
async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

// API: Lấy danh sách user
app.get('/api/users', async (req, res) => {
  const users = await readUsers();
  res.json(users);
});

// API: Lấy thông tin user theo username
app.get('/api/users/:username', async (req, res) => {
  const users = await readUsers();
  const user = users.find(u => u.username === req.params.username);
  if (!user) return res.status(404).json({error: 'User not found'});
  res.json(user);
});

// API: Thêm user mới
app.post('/api/users', async (req, res) => {
  const users = await readUsers();
  const { username } = req.body;
  if (!username) return res.status(400).json({error: 'Username required'});
  if (users.find(u => u.username === username)) return res.status(409).json({error: 'User exists'});
  users.push(req.body);
  await writeUsers(users);
  res.status(201).json({message: 'User created'});
});

// API: Cập nhật thông tin user (PUT)
app.put('/api/users/:username', async (req, res) => {
  const users = await readUsers();
  const idx = users.findIndex(u => u.username === req.params.username);
  if (idx === -1) return res.status(404).json({error: 'User not found'});
  users[idx] = { ...users[idx], ...req.body };
  await writeUsers(users);
  res.json({message: 'User updated'});
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'phần_chính', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 