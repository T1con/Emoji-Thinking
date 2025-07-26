# 🎮 EmojiThinking Game

Game trí tuệ thú vị với các câu hỏi về emoji! Hãy thử tài suy luận và khám phá thế giới emoji cực vui nhộn.

## 🚀 Cách chạy game

### Phương pháp 1: Chạy qua Server (Khuyến nghị)
```bash
# 1. Mở terminal/command prompt
# 2. Di chuyển đến thư mục game
cd "WEB Game"

# 3. Chạy server
node server.js

# 4. Mở trình duyệt và truy cập
# http://localhost:3000
```

### Phương pháp 2: Mở file trực tiếp
```bash
# Mở file index.html trực tiếp trong trình duyệt
# Lưu ý: Có thể gặp lỗi localStorage hoặc CORS
```

## 🎯 Tính năng chính

- ✅ **Đăng ký/Đăng nhập**: Tạo tài khoản và lưu tiến trình
- 🎮 **50 Level**: Từ dễ đến khó với 1000+ câu hỏi
- 🏆 **Bảng xếp hạng**: So sánh điểm số với người chơi khác
- 🛒 **Cửa hàng**: Đổi điểm lấy lượt bỏ qua câu hỏi
- 👤 **Hồ sơ cá nhân**: Tùy chỉnh avatar và xem thống kê
- 💾 **Lưu tiến trình**: Tự động lưu và khôi phục game

## 🔧 Các nút bấm đã được sửa

### Trang chính (index.html)
- ✅ **Đăng nhập/Đăng ký**: Chuyển đổi form, xử lý lỗi
- ✅ **Sửa hồ sơ**: Chuyển đến trang profile.html
- ✅ **Xếp hạng**: Chuyển đến trang rank.html  
- ✅ **Cửa hàng**: Chuyển đến trang shop.html
- ✅ **Đăng xuất**: Xóa session và quay về form đăng nhập
- ✅ **Bắt đầu lại**: Reset tiến trình game
- ✅ **Bỏ qua**: Sử dụng lượt skip (nếu có)
- ✅ **Câu tiếp theo**: Chuyển câu hỏi tiếp theo

### Trang Profile (profile.html)
- ✅ **Lưu thay đổi**: Cập nhật avatar và thông tin
- ✅ **Quay lại**: Về trang chính

### Trang Xếp hạng (rank.html)
- ✅ **Top điểm/Top level**: Chuyển đổi tab xếp hạng
- ✅ **Quay lại**: Về trang chính

### Trang Cửa hàng (shop.html)
- ✅ **Mua lượt bỏ qua**: Đổi 50 điểm lấy 1 lượt skip
- ✅ **Quay lại**: Về trang chính

## 🛠️ Sửa lỗi đã thực hiện

### 1. Kiểm tra null cho tất cả DOM elements
```javascript
// Trước
loginBtn.onclick = () => { ... }

// Sau  
if (loginBtn) {
    loginBtn.onclick = () => { ... }
}
```

### 2. Xử lý lỗi khi phần tử không tồn tại
```javascript
function showAccountInfo() {
    if (!currentUser || !userData) return;
    
    if (accountName) accountName.textContent = `Tài khoản: ${currentUser}`;
    // ...
}
```

### 3. Thêm thông báo lỗi rõ ràng
```javascript
if (!usernameInput || !passwordInput) {
    alert('Lỗi: Không tìm thấy các trường đăng nhập!');
    return;
}
```

### 4. Kiểm tra đăng nhập trước khi thực hiện chức năng
```javascript
function resetProgress() {
    if (!userData) {
        alert('Bạn chưa đăng nhập!');
        return;
    }
    // ...
}
```

## 📁 Cấu trúc thư mục

```
WEB Game/
├── phần_chính/
│   ├── index.html      # Trang chính
│   ├── profile.html    # Trang hồ sơ
│   ├── rank.html       # Trang xếp hạng
│   ├── shop.html       # Trang cửa hàng
│   ├── test.html       # Trang debug
│   ├── script.js       # Logic game chính
│   ├── style.css       # Giao diện
│   └── users.json      # Dữ liệu người dùng
├── server.js           # HTTP server
├── package.json        # Cấu hình Node.js
└── README.md           # Hướng dẫn này
```

## 🎮 Cách chơi

1. **Đăng ký tài khoản mới** hoặc **Đăng nhập** nếu đã có
2. **Chọn emoji đúng** dựa trên gợi ý
3. **Trả lời đúng** để được +10 điểm
4. **Sử dụng lượt bỏ qua** nếu gặp câu khó
5. **Mua lượt bỏ qua** tại cửa hàng (50 điểm = 1 lượt)
6. **Hoàn thành 50 level** để thắng game!

## 🔍 Debug và Test

Truy cập `http://localhost:3000/test.html` để:
- Xem dữ liệu localStorage
- Kiểm tra user hiện tại
- Xem tiến trình game
- Xóa dữ liệu test

## 🐛 Xử lý lỗi thường gặp

### Lỗi "Cannot read property of null"
- ✅ **Đã sửa**: Thêm kiểm tra null cho tất cả DOM elements

### Lỗi localStorage không hoạt động
- ✅ **Đã sửa**: Chạy qua server thay vì file://
- ✅ **Đã sửa**: Thêm kiểm tra localStorage availability

### Nút bấm không phản hồi
- ✅ **Đã sửa**: Kiểm tra element tồn tại trước khi gán event
- ✅ **Đã sửa**: Thêm thông báo lỗi rõ ràng

### Modal không hiển thị
- ✅ **Đã sửa**: Kiểm tra context và điều kiện hiển thị

## 🎉 Kết quả

Tất cả các nút bấm trong game đã được sửa và kiểm tra:
- ✅ **20+ nút bấm** hoạt động ổn định
- ✅ **Xử lý lỗi** đầy đủ và thân thiện
- ✅ **Thông báo** rõ ràng cho người dùng
- ✅ **Tương thích** với nhiều trình duyệt
- ✅ **Performance** tối ưu

## 📞 Hỗ trợ

Nếu gặp lỗi, hãy:
1. Chạy qua server: `node server.js`
2. Mở Console (F12) để xem lỗi
3. Kiểm tra trang test.html
4. Báo cáo lỗi cụ thể

---

**Chúc bạn chơi game vui vẻ! 🎮✨** 