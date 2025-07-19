// Tạo 1000 câu hỏi mẫu, chia đều cho 50 level
const emojiList = [
    {hint: "Trái cây màu đỏ, thường ăn vào mùa thu", answer: "🍎", options: ["🍎", "🍌", "🍉", "🍇"]},
    {hint: "Loài vật kêu meo meo", answer: "🐱", options: ["🐱", "🐶", "🐭", "🐰"]},
    {hint: "Thức uống nóng, màu nâu, giúp tỉnh táo", answer: "☕", options: ["☕", "🍵", "🥛", "🍺"]},
    {hint: "Phương tiện di chuyển trên đường, có hai bánh", answer: "🚲", options: ["🚲", "🚗", "🚌", "🚕"]},
    {hint: "Loài vật sống dưới nước, có vây, bơi rất giỏi", answer: "🐟", options: ["🐟", "🐬", "🐳", "🦈"]},
    {hint: "Trái cây màu vàng, vị chua", answer: "🍋", options: ["🍋", "🍌", "🍍", "🍊"]},
    {hint: "Loài vật có cánh, biết bay, kêu chip chip", answer: "🐦", options: ["🐦", "🐧", "🦆", "🦅"]},
    {hint: "Thứ dùng để viết lên giấy", answer: "✏️", options: ["✏️", "🖊️", "🖋️", "🖌️"]},
    {hint: "Loài vật có vòi, rất to", answer: "🐘", options: ["🐘", "🦏", "🦛", "🐪"]},
    {hint: "Biểu tượng thể hiện sự suy nghĩ", answer: "🤔", options: ["🤔", "😮", "😎", "😂"]},
    // ... có thể bổ sung thêm mẫu ...
];

const TOTAL_LEVELS = 50;
const QUESTIONS_PER_LEVEL = 20;
const TOTAL_QUESTIONS = TOTAL_LEVELS * QUESTIONS_PER_LEVEL;

const questions = [];
for (let i = 0; i < TOTAL_QUESTIONS; i++) {
    const base = emojiList[Math.floor(Math.random() * emojiList.length)];
    // Biến tấu hint cho đa dạng
    const hint = `${base.hint} (Level ${Math.floor(i/QUESTIONS_PER_LEVEL)+1}) - ${i%QUESTIONS_PER_LEVEL+1}`;
    // Đảo vị trí đáp án
    const shuffledOptions = base.options.slice().sort(() => Math.random() - 0.5);
    questions.push({
        hint,
        answer: base.answer,
        options: shuffledOptions
    });
}

let current = 0;
let score = 0;
let currentLevel = 1;

const hintEl = document.getElementById('hint');
const emojiOptionsEl = document.getElementById('emoji-options');
const resultEl = document.getElementById('result');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');
const resetProgressBtn = document.getElementById('reset-progress-btn');

let levelQuestions = [];

// --- TÀI KHOẢN ---
const loginSection = document.getElementById('login-section');
const gameSection = document.getElementById('game-section');
const usernameInput = document.getElementById('username-input');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const accountName = document.getElementById('account-name');
const accountBest = document.getElementById('account-best');
const profileBar = document.getElementById('profile-bar');
const profileAvatar = document.getElementById('profile-avatar');
const accountPoints = document.getElementById('account-points');
const accountSkips = document.getElementById('account-skips');
const shopBtn = document.getElementById('shop-btn');
const shopModal = document.getElementById('shop-modal');
const closeShopModal = document.getElementById('close-shop-modal');
const buySkipBtn = document.getElementById('buy-skip-btn');
const shopMessage = document.getElementById('shop-message');
const skipBtn = document.getElementById('skip-btn');

// --- ĐĂNG NHẬP/ĐĂNG KÝ ---
const registerSection = document.getElementById('register-section');
const switchToRegister = document.getElementById('switch-to-register');
const switchToLogin = document.getElementById('switch-to-login');
const registerBtn = document.getElementById('register-btn');
const regUsernameInput = document.getElementById('reg-username-input');
const regPasswordInput = document.getElementById('reg-password-input');
const regPassword2Input = document.getElementById('reg-password2-input');
const passwordInput = document.getElementById('password-input');

let currentUser = null;
let userData = null;

function getUserData(username) {
    const data = localStorage.getItem('emojithinking_user_' + username);
    return data ? JSON.parse(data) : {bestScore: 0, bestLevel: 1};
}

function saveUserData() {
    if (currentUser && userData) {
        localStorage.setItem('emojithinking_user_' + currentUser, JSON.stringify(userData));
    }
}

// Chuyển sang form đăng ký
switchToRegister.onclick = () => {
    loginSection.style.display = 'none';
    registerSection.style.display = '';
};
// Chuyển về form đăng nhập
switchToLogin.onclick = () => {
    registerSection.style.display = 'none';
    loginSection.style.display = '';
};

// Hàm hash SHA-256 (trả về hex string)
async function sha256(str) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map(x => x.toString(16).padStart(2, '0')).join('');
}

// Đăng ký tài khoản mới
registerBtn.onclick = async () => {
    const username = regUsernameInput.value.trim();
    const pw1 = regPasswordInput.value;
    const pw2 = regPassword2Input.value;
    if (!username || !pw1 || !pw2) {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }
    if (pw1 !== pw2) {
        alert('Mật khẩu nhập lại không khớp!');
        return;
    }
    if (localStorage.getItem('emojithinking_user_' + username)) {
        alert('Tên tài khoản đã tồn tại!');
        return;
    }
    const pwHash = await sha256(pw1);
    const userObj = { password: pwHash, bestScore: 0, bestLevel: 1 };
    localStorage.setItem('emojithinking_user_' + username, JSON.stringify(userObj));
    alert('Đăng ký thành công! Bạn có thể đăng nhập.');
    regUsernameInput.value = '';
    regPasswordInput.value = '';
    regPassword2Input.value = '';
    registerSection.style.display = 'none';
    loginSection.style.display = '';
};

// Đăng nhập
loginBtn.onclick = async () => {
    const username = usernameInput.value.trim();
    const pw = passwordInput.value;
    if (!username || !pw) {
        alert('Vui lòng nhập tên tài khoản và mật khẩu!');
        return;
    }
    const data = localStorage.getItem('emojithinking_user_' + username);
    if (!data) {
        alert('Tài khoản không tồn tại!');
        return;
    }
    const userObj = JSON.parse(data);
    const pwHash = await sha256(pw);
    if (userObj.password !== pwHash) {
        alert('Mật khẩu không đúng!');
        return;
    }
    currentUser = username;
    userData = userObj;
    showAccountInfo();
    loginSection.style.display = 'none';
    gameSection.style.display = '';
    profileBar.style.display = '';
    startGame();
    passwordInput.value = '';
    // Lưu đăng nhập
    localStorage.setItem('emojithinking_logged_in_user', currentUser);
};

// Khi đăng xuất
logoutBtn.onclick = () => {
    currentUser = null;
    userData = null;
    loginSection.style.display = '';
    gameSection.style.display = 'none';
    profileBar.style.display = 'none';
    // Xóa lưu đăng nhập
    localStorage.removeItem('emojithinking_logged_in_user');
};

// --- CẬP NHẬT PROFILE BAR ---
function showAccountInfo() {
    accountName.textContent = `Tài khoản: ${currentUser}`;
    accountBest.textContent = `Level cao nhất: ${userData.bestLevel} | Điểm cao nhất: ${userData.bestScore}`;
    // Hiển thị avatar ảnh nếu có, nếu không thì emoji
    if (userData.avatarImg) {
        profileAvatar.innerHTML = `<img src="${userData.avatarImg}" alt="avatar" style="width:38px;height:38px;border-radius:50%;object-fit:cover;vertical-align:middle;box-shadow:0 2px 8px #43c6ac33;">`;
    } else {
        profileAvatar.textContent = userData.avatar || '🧑';
    }
    accountPoints.textContent = `Điểm: ${userData.points || 0}`;
    accountSkips.textContent = `Lượt bỏ qua: ${userData.skips || 0}`;
    if (currentUser) {
        profileBar.style.display = '';
        var accInfo = document.querySelector('.account-info');
        if (accInfo) accInfo.style.display = 'none';
    } else {
        profileBar.style.display = 'none';
    }
}

// --- ĐIỂM VÀ SKIP ---
function addPoints(n) {
    userData.points = (userData.points || 0) + n;
    saveUserData();
    showAccountInfo();
}
function useSkip() {
    if ((userData.skips || 0) > 0) {
        userData.skips--;
        saveUserData();
        showAccountInfo();
        return true;
    }
    return false;
}
function buySkip() {
    if ((userData.points || 0) >= 50) {
        userData.points -= 50;
        userData.skips = (userData.skips || 0) + 1;
        saveUserData();
        showAccountInfo();
        return true;
    }
    return false;
}

// --- SHOP MODAL ---
shopBtn.onclick = () => {
    window.location.href = 'shop.html';
};
closeShopModal.onclick = () => {
    shopModal.style.display = 'none';
};
buySkipBtn.onclick = () => {
    if (buySkip()) {
        shopMessage.textContent = 'Đã mua 1 lượt bỏ qua!';
    } else {
        shopMessage.textContent = 'Bạn không đủ điểm!';
    }
};
window.addEventListener('click', (e) => {
    if (e.target === shopModal) shopModal.style.display = 'none';
});

function getRandomQuestionIndexes(level, n) {
    const start = (level - 1) * QUESTIONS_PER_LEVEL;
    const indexes = Array.from({length: QUESTIONS_PER_LEVEL}, (_, i) => start + i);
    for (let i = indexes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
    }
    return indexes.slice(0, n);
}

function getQuestionsForLevel(level, indexes) {
    if (!indexes) {
        // Nếu chưa có danh sách, sinh ngẫu nhiên 20 câu không trùng
        indexes = getRandomQuestionIndexes(level, 20);
    }
    return indexes.map(i => questions[i]);
}

// --- LƯU & PHỤC HỒI TIẾN TRÌNH ---
function saveProgress() {
    if (!userData.progress) userData.progress = {};
    userData.progress.currentLevel = currentLevel;
    userData.progress.current = current;
    userData.progress.score = score;
    userData.progress.skips = userData.skips || 0;
    userData.progress.points = userData.points || 0;
    // Lưu danh sách chỉ số câu hỏi đã chọn cho từng level
    if (!userData.progress.levelIndexes) userData.progress.levelIndexes = {};
    userData.progress.levelIndexes[currentLevel] = levelIndexes.slice();
    saveUserData();
}
function loadProgress() {
    if (userData.progress) {
        currentLevel = userData.progress.currentLevel || 1;
        current = userData.progress.current || 0;
        score = userData.progress.score || 0;
        userData.skips = userData.progress.skips || 0;
        userData.points = userData.progress.points || 0;
        // Lấy lại danh sách chỉ số câu hỏi đã chọn cho từng level
        if (userData.progress.levelIndexes && userData.progress.levelIndexes[currentLevel]) {
            levelIndexes = userData.progress.levelIndexes[currentLevel].slice();
        } else {
            levelIndexes = getRandomQuestionIndexes(currentLevel, 20);
        }
    } else {
        currentLevel = 1;
        current = 0;
        score = 0;
        levelIndexes = getRandomQuestionIndexes(1, 20);
    }
}
function resetProgress() {
    delete userData.progress;
    saveUserData();
    currentLevel = 1;
    current = 0;
    score = 0;
    userData.skips = 0;
    userData.points = 0;
    levelIndexes = getRandomQuestionIndexes(1, 20);
    showAccountInfo();
    startGame();
}
if (resetProgressBtn) resetProgressBtn.onclick = resetProgress;

// --- GAME LOGIC ---
function showQuestion() {
    // Lấy lại danh sách câu hỏi cho level hiện tại
    levelQuestions = getQuestionsForLevel(currentLevel, levelIndexes);
    const q = levelQuestions[current];
    levelEl.textContent = `Level ${currentLevel} / ${TOTAL_LEVELS}`;
    hintEl.textContent = q.hint;
    resultEl.textContent = '';
    nextBtn.style.display = 'none';
    emojiOptionsEl.innerHTML = '';
    q.options.forEach(emoji => {
        const btn = document.createElement('button');
        btn.className = 'emoji-btn';
        btn.textContent = emoji;
        btn.onclick = () => checkAnswer(emoji);
        emojiOptionsEl.appendChild(btn);
    });
    scoreEl.textContent = `Điểm: ${score}/${levelQuestions.length}`;
    updateSkipBtn();
}

// Khi trả lời đúng hoặc bỏ qua, lưu tiến trình
function checkAnswer(selected) {
    const q = levelQuestions[current];
    if (selected === q.answer) {
        resultEl.textContent = '🎉 Chính xác!';
        score++;
        addPoints(10); // +10 điểm mỗi câu đúng
        Array.from(document.getElementsByClassName('emoji-btn')).forEach(btn => btn.disabled = true);
        nextBtn.style.display = 'inline-block';
    } else {
        resultEl.textContent = '❌ Sai rồi, thử lại nhé!';
    }
    scoreEl.textContent = `Điểm: ${score}/${levelQuestions.length}`;
    saveProgress();
}

// --- SKIP BUTTON ---
function updateSkipBtn() {
    if ((userData.skips || 0) > 0) {
        skipBtn.style.display = '';
    } else {
        skipBtn.style.display = 'none';
    }
}
skipBtn.onclick = () => {
    if (useSkip()) {
        current++;
        if (current < 20) {
            showQuestion();
        } else if (currentLevel < TOTAL_LEVELS) {
            currentLevel++;
            current = 0;
            if (userData.progress && userData.progress.levelIndexes && userData.progress.levelIndexes[currentLevel]) {
                levelIndexes = userData.progress.levelIndexes[currentLevel].slice();
            } else {
                levelIndexes = getRandomQuestionIndexes(currentLevel, 20);
            }
            showQuestion();
        } else {
            hintEl.textContent = 'Hoàn thành tất cả 50 level!';
            emojiOptionsEl.innerHTML = '';
            resultEl.textContent = `Bạn đã trả lời đúng ${score}/${TOTAL_LEVELS * QUESTIONS_PER_LEVEL} câu!`;
            nextBtn.style.display = 'none';
            levelEl.textContent = '';
        }
        saveProgress();
    }
    updateSkipBtn();
};

nextBtn.onclick = () => {
    current++;
    if (current < 20) {
        showQuestion();
    } else if (currentLevel < TOTAL_LEVELS) {
        currentLevel++;
        current = 0;
        // Sinh lại danh sách câu hỏi mới cho level tiếp theo (nếu chưa có trong progress)
        if (userData.progress && userData.progress.levelIndexes && userData.progress.levelIndexes[currentLevel]) {
            levelIndexes = userData.progress.levelIndexes[currentLevel].slice();
        } else {
            levelIndexes = getRandomQuestionIndexes(currentLevel, 20);
        }
        showQuestion();
    } else {
        hintEl.textContent = 'Hoàn thành tất cả 50 level!';
        emojiOptionsEl.innerHTML = '';
        resultEl.textContent = `Bạn đã trả lời đúng ${score}/${TOTAL_LEVELS * QUESTIONS_PER_LEVEL} câu!`;
        nextBtn.style.display = 'none';
        levelEl.textContent = '';
    }
    saveProgress();
    // Lưu điểm và level cao nhất
    if (userData) {
        if (currentLevel > userData.bestLevel) userData.bestLevel = currentLevel;
        if (score > userData.bestScore) userData.bestScore = score;
        saveUserData();
        showAccountInfo();
    }
};

function startGame() {
    loadProgress();
    showQuestion();
    if (userData) showAccountInfo();
}

// Tự động đăng nhập nếu có lưu
window.addEventListener('DOMContentLoaded', async () => {
    const autoUser = localStorage.getItem('emojithinking_logged_in_user');
    if (autoUser) {
        const data = localStorage.getItem('emojithinking_user_' + autoUser);
        if (data) {
            const userObj = JSON.parse(data);
            currentUser = autoUser;
            userData = userObj;
            showAccountInfo();
            loginSection.style.display = 'none';
            gameSection.style.display = '';
            profileBar.style.display = '';
            startGame();
        } else {
            localStorage.removeItem('emojithinking_logged_in_user');
        }
    }
});

// Lưu lại user cuối cùng khi đăng nhập
loginBtn.addEventListener('click', () => {
    if (usernameInput.value.trim()) {
        localStorage.setItem('emojithinking_last_user', usernameInput.value.trim());
    }
});

startGame();

window.addEventListener('DOMContentLoaded', () => {
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const rankBtn = document.getElementById('rank-btn');
    if (editProfileBtn) editProfileBtn.onclick = () => { window.location.href = 'profile.html'; };
    if (rankBtn) rankBtn.onclick = () => { window.location.href = 'rank.html'; };
}); 