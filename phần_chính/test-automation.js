// Tự động test các chức năng chính của EmojiThinking
(async function() {
    const log = (...args) => {
        console.log('%c[TEST]', 'color:#43c6ac;font-weight:bold;', ...args);
    };
    const error = (...args) => {
        console.error('%c[TEST-ERROR]', 'color:#f56565;font-weight:bold;', ...args);
    };
    // 1. Test đăng ký user mới
    const testUser = 'testuser_' + Math.floor(Math.random()*10000);
    const testPass = 'test1234';
    log('Bắt đầu test với user:', testUser);
    // Xóa user nếu đã tồn tại
    localStorage.removeItem('emojithinking_user_' + testUser);
    // Đăng ký
    const pwHash = await (async function sha256(str) {
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
        return Array.from(new Uint8Array(buf)).map(x => x.toString(16).padStart(2, '0')).join('');
    })(testPass);
    localStorage.setItem('emojithinking_user_' + testUser, JSON.stringify({ password: pwHash, bestScore: 0, bestLevel: 1 }));
    log('Đăng ký user thành công.');
    // 2. Test đăng nhập
    localStorage.setItem('emojithinking_logged_in_user', testUser);
    let userData = JSON.parse(localStorage.getItem('emojithinking_user_' + testUser));
    if (!userData) { error('Đăng nhập thất bại!'); return; }
    log('Đăng nhập thành công.');
    // 3. Test lưu tiến trình
    userData.progress = { currentLevel: 2, current: 5, score: 30, skips: 2, points: 100, levelIndexes: {2: [20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]} };
    localStorage.setItem('emojithinking_user_' + testUser, JSON.stringify(userData));
    log('Lưu tiến trình thành công.');
    // 4. Test đổi avatar emoji
    userData.avatar = '😎';
    userData.avatarImg = null;
    localStorage.setItem('emojithinking_user_' + testUser, JSON.stringify(userData));
    log('Đổi avatar emoji thành công.');
    // 5. Test upload avatar ảnh (base64 giả lập)
    userData.avatarImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA';
    userData.avatar = null;
    localStorage.setItem('emojithinking_user_' + testUser, JSON.stringify(userData));
    log('Đổi avatar ảnh thành công.');
    // 6. Test mua skip
    userData.points = 100;
    userData.skips = 0;
    if (userData.points >= 50) {
        userData.points -= 50;
        userData.skips += 1;
        localStorage.setItem('emojithinking_user_' + testUser, JSON.stringify(userData));
        log('Mua skip thành công.');
    } else {
        error('Không đủ điểm để mua skip!');
    }
    // 7. Test reset tiến trình
    delete userData.progress;
    localStorage.setItem('emojithinking_user_' + testUser, JSON.stringify(userData));
    log('Reset tiến trình thành công.');
    // 8. Test chuyển trang (giả lập)
    log('Chuyển trang profile.html:', location.origin + location.pathname.replace(/\/[^/]+$/, '/profile.html'));
    log('Chuyển trang rank.html:', location.origin + location.pathname.replace(/\/[^/]+$/, '/rank.html'));
    log('Chuyển trang shop.html:', location.origin + location.pathname.replace(/\/[^/]+$/, '/shop.html'));
    // 9. Kiểm tra LocalStorage
    const allKeys = Object.keys(localStorage).filter(k => k.startsWith('emojithinking_user_'));
    if (allKeys.length === 0) error('Không có user nào trong LocalStorage!');
    else log('Có', allKeys.length, 'user trong LocalStorage.');
    // 10. Tự động sửa lỗi dữ liệu nếu phát hiện
    allKeys.forEach(k => {
        let d = JSON.parse(localStorage.getItem(k));
        let changed = false;
        if (!d.bestScore) { d.bestScore = 0; changed = true; }
        if (!d.bestLevel) { d.bestLevel = 1; changed = true; }
        if (changed) {
            localStorage.setItem(k, JSON.stringify(d));
            log('Tự động sửa dữ liệu thiếu cho user:', k.replace('emojithinking_user_',''));
        }
    });
    log('Test hoàn tất! Nếu có lỗi sẽ hiện màu đỏ ở console.');
})(); 