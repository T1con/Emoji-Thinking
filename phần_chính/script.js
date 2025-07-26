// Danh sách 4000 emoji phổ biến (ví dụ, ở đây chỉ liệt kê một số, bạn cần bổ sung đủ 4000 emoji thực tế)
const emojiPool = [
    "😀","😁","😂","🤣","😃","😄","😅","😆","😉","😊","😋","😎","😍","😘","🥰","😗","😙","😚","🙂","🤗","🤩","🤔","🤨","😐","😑","😶","🙄","😏","😣","😥","😮","🤐","😯","😪","😫","🥱","😴","😌","😛","😜","😝","🤤","😒","😓","😔","😕","🙃","🤑","😲","☹️","🙁","😖","😞","😟","😤","😢","😭","😦","😧","😨","😩","🤯","😬","😰","😱","🥵","🥶","😳","🤪","😵","😡","😠","🤬","😷","🤒","🤕","🤢","🤮","🤧","😇","🥳","🥺","🤠","🤡","🤥","🤫","🤭","🧐","🤓","😈","👿","👹","👺","💀","👻","👽","👾","🤖","😺","😸","😹","😻","😼","😽","🙀","😿","😾",
    // ... (bạn cần bổ sung đủ 4000 emoji ở đây, có thể lấy từ các nguồn emoji unicode)
];

// Hàm tạo options gồm đáp án đúng và 3 emoji ngẫu nhiên khác
function generateOptions(answer) {
    const options = [answer];
    while (options.length < 4) {
        const e = emojiPool[Math.floor(Math.random() * emojiPool.length)];
        if (!options.includes(e)) options.push(e);
    }
    // Đảo vị trí các emoji
    return options.sort(() => Math.random() - 0.5);
}

// Các câu hỏi mẫu minh họa (giữ nguyên)
const sampleQuestions = [
    // Level 1 (Dễ - gợi ý trực tiếp)
    {hint: "Loài vật kêu meo meo", answer: "🐱", options: generateOptions("🐱")},
    {hint: "Trái cây màu đỏ, thường ăn vào mùa thu", answer: "🍎", options: generateOptions("🍎")},
    {hint: "Thức uống nóng, màu nâu, giúp tỉnh táo", answer: "☕", options: generateOptions("☕")},
    {hint: "Phương tiện di chuyển trên đường, có hai bánh", answer: "🚲", options: generateOptions("🚲")},
    {hint: "Loài vật sống dưới nước, có vây, bơi rất giỏi", answer: "🐟", options: generateOptions("🐟")},
    // Level 10 (Trung bình)
    {hint: "Loài vật thích ăn cá, thường được nuôi trong nhà", answer: "🐱", options: generateOptions("🐱")},
    {hint: "Thức uống giúp bạn tỉnh táo vào mỗi sáng", answer: "☕", options: generateOptions("☕")},
    {hint: "Phương tiện nhỏ gọn, không gây ô nhiễm, tốt cho sức khỏe", answer: "🚲", options: generateOptions("🚲")},
    {hint: "Trái cây màu đỏ, biểu tượng cho sự cám dỗ trong thần thoại", answer: "🍎", options: generateOptions("🍎")},
    {hint: "Loài vật có thể sống cả dưới nước lẫn trên cạn, thường nhảy", answer: "🐸", options: generateOptions("🐸")},
    // Level 25 (Khó)
    {hint: "Nhân vật chính trong bộ phim hoạt hình 'Tom & ...'", answer: "🐱", options: generateOptions("🐱")},
    {hint: "Được dùng để ghi chú ý tưởng, thường có đầu màu hồng", answer: "✏️", options: generateOptions("✏️")},
    {hint: "Biểu tượng của sự sáng tạo, thường dùng trong lớp học", answer: "✏️", options: generateOptions("✏️")},
    {hint: "Loài vật đại diện cho sự may mắn ở Nhật Bản (Maneki-neko)", answer: "🐱", options: generateOptions("🐱")},
    {hint: "Thức uống xuất hiện nhiều trong các quán cà phê sách", answer: "☕", options: generateOptions("☕")},
    // Level 40 (Rất khó)
    {hint: "Kẻ thù truyền kiếp của chuột Jerry", answer: "🐱", options: generateOptions("🐱")},
    {hint: "Vật dụng nhỏ bé, nhưng có thể tạo nên những tác phẩm lớn", answer: "✏️", options: generateOptions("✏️")},
    {hint: "Thức uống giúp bạn 'tỉnh như sáo' sau một đêm thức khuya", answer: "☕", options: generateOptions("☕")},
    {hint: "Trái cây xuất hiện trong logo của một hãng công nghệ nổi tiếng", answer: "🍎", options: generateOptions("🍎")},
    {hint: "Phương tiện không cần xăng, chỉ cần đôi chân khỏe", answer: "🚲", options: generateOptions("🚲")},
];

// Tự động sinh thêm câu hỏi cho đủ 1000 câu, mỗi level 20 câu
const TOTAL_LEVELS = 50;
const QUESTIONS_PER_LEVEL = 20;
const TOTAL_QUESTIONS = TOTAL_LEVELS * QUESTIONS_PER_LEVEL;

function getHint(emoji, level, usedHints) {
    // Một số mô tả mẫu cho các nhóm emoji phổ biến
    const emojiDescriptions = {
        "🐱": ["Loài vật nuôi kêu meo meo", "Bạn của Tom trong phim hoạt hình nổi tiếng", "Được nuôi để bắt chuột", "Biểu tượng của sự dễ thương và mềm mại", "Loài vật thích liếm lông"],
        "🍎": ["Trái cây màu đỏ, thường ăn vào mùa thu", "Biểu tượng của sự cám dỗ trong thần thoại", "Xuất hiện trong logo của một hãng công nghệ nổi tiếng", "Trái cây được tặng cho giáo viên ở phương Tây", "Có câu thành ngữ: 'An ___ a day keeps the doctor away'"],
        "☕": ["Thức uống giúp tỉnh táo vào buổi sáng", "Xuất hiện nhiều trong các quán cà phê sách", "Được pha từ hạt rang xay", "Thường uống nóng, màu nâu", "Thức uống phổ biến trên toàn thế giới"],
        "🚲": ["Phương tiện di chuyển không cần xăng", "Tốt cho sức khỏe và môi trường", "Có hai bánh, thường dùng để tập thể dục", "Phương tiện phổ biến ở Hà Lan", "Chỉ cần đôi chân khỏe là đi được"],
        "🐟": ["Loài vật sống dưới nước, có vây, bơi rất giỏi", "Nguồn thực phẩm giàu omega-3", "Thường được nuôi trong bể kính", "Là biểu tượng của cung Song Ngư", "Có thể sống ở sông, hồ hoặc biển"],
        // ... có thể bổ sung thêm mô tả cho nhiều emoji khác ...
    };
    // Nếu emoji có mô tả riêng, chọn mô tả chưa dùng
    if (emojiDescriptions[emoji]) {
        for (const desc of emojiDescriptions[emoji]) {
            if (!usedHints.has(desc)) return desc;
        }
    }
    // Gợi ý chung cho các emoji khác
    const genericHints = [
        "Đây là một biểu tượng quen thuộc trong cuộc sống.",
        "Bạn thường thấy biểu tượng này trong các cuộc trò chuyện hoặc đời sống hằng ngày.",
        "Hãy nghĩ đến một hình ảnh, sự vật hoặc cảm xúc mà biểu tượng này đại diện.",
        "Đố mẹo: Biểu tượng này là gì?",
        "Biểu tượng này thường xuất hiện trong các ứng dụng nhắn tin.",
        "Nó có thể đại diện cho một cảm xúc, sự vật hoặc hành động.",
        "Bạn có thể gặp biểu tượng này khi nói chuyện với bạn bè.",
        "Đây là một trong những emoji phổ biến nhất.",
        "Biểu tượng này có thể gợi nhớ đến một sự kiện hoặc kỷ niệm.",
        "Nó thường được dùng để thể hiện cảm xúc hoặc ý tưởng."
    ];
    for (const hint of genericHints) {
        if (!usedHints.has(hint)) return hint;
    }
    // Nếu hết gợi ý, sinh gợi ý ngẫu nhiên có số thứ tự để đảm bảo duy nhất
    let i = 1;
    while (true) {
        const alt = `Gợi ý đặc biệt #${i}`;
        if (!usedHints.has(alt)) return alt;
        i++;
    }
}

const used = new Set(sampleQuestions.map(q => q.hint + '|' + q.answer));
const usedHints = new Set(sampleQuestions.map(q => q.hint));
const questions = [...sampleQuestions];

while (questions.length < TOTAL_QUESTIONS) {
    const level = Math.floor(questions.length / QUESTIONS_PER_LEVEL) + 1;
    // Chọn emoji đáp án ngẫu nhiên từ emojiPool
    const answer = emojiPool[Math.floor(Math.random() * emojiPool.length)];
    // Sinh gợi ý hợp lý theo level, đảm bảo không trùng
    const hint = getHint(answer, level, usedHints) + ` (Level ${level})`;
    if (usedHints.has(hint)) continue;
    // Tránh trùng lặp
    const key = hint + '|' + answer;
    if (used.has(key)) continue;
    questions.push({
        hint,
        answer,
        options: generateOptions(answer)
    });
    used.add(key);
    usedHints.add(hint);
}

function arrayEquals(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

let levelIndexes = [];

let current = 0;
let score = 0;
let currentLevel = 1;

// Lấy các phần tử DOM với kiểm tra null
const hintEl = document.getElementById('hint');
const emojiOptionsEl = document.getElementById('emoji-options');
const resultEl = document.getElementById('result');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');
const resetProgressBtn = document.getElementById('reset-progress-btn');

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
if (switchToRegister) {
    switchToRegister.onclick = () => {
        if (loginSection) loginSection.style.display = 'none';
        if (registerSection) registerSection.style.display = '';
        if (regUsernameInput) regUsernameInput.focus();
    };
}

// Chuyển về form đăng nhập
if (switchToLogin) {
    switchToLogin.onclick = () => {
        if (registerSection) registerSection.style.display = 'none';
        if (loginSection) loginSection.style.display = '';
        if (usernameInput) usernameInput.focus();
    };
}

// Hàm hash SHA-256 (trả về hex string)
async function sha256(str) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map(x => x.toString(16).padStart(2, '0')).join('');
}

// Đăng ký tài khoản mới
if (registerBtn) {
    registerBtn.onclick = async () => {
        if (!regUsernameInput || !regPasswordInput || !regPassword2Input) {
            alert('Lỗi: Không tìm thấy các trường đăng ký!');
            return;
        }
        const username = regUsernameInput.value.trim();
        const pw1 = regPasswordInput.value;
        const pw2 = regPassword2Input.value;
        if (!username || !pw1 || !pw2) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            if (regUsernameInput) regUsernameInput.focus();
            return;
        }
        if (pw1 !== pw2) {
            alert('Mật khẩu nhập lại không khớp!');
            if (regPassword2Input) regPassword2Input.focus();
            return;
        }
        if (localStorage.getItem('emojithinking_user_' + username)) {
            alert('Tên tài khoản đã tồn tại!');
            if (regUsernameInput) regUsernameInput.focus();
            return;
        }
        const pwHash = await sha256(pw1);
        const userObj = { password: pwHash, bestScore: 0, bestLevel: 1 };
        localStorage.setItem('emojithinking_user_' + username, JSON.stringify(userObj));
        alert('Đăng ký thành công! Bạn có thể đăng nhập.');
        if (regUsernameInput) regUsernameInput.value = '';
        if (regPasswordInput) regPasswordInput.value = '';
        if (regPassword2Input) regPassword2Input.value = '';
        if (registerSection) registerSection.style.display = 'none';
        if (loginSection) loginSection.style.display = '';
        if (usernameInput) usernameInput.focus();
    };
}

// Đăng nhập
if (loginBtn) {
    loginBtn.onclick = async () => {
        if (!usernameInput || !passwordInput) {
            alert('Lỗi: Không tìm thấy các trường đăng nhập!');
            return;
        }
        const username = usernameInput.value.trim();
        const pw = passwordInput.value;
        if (!username || !pw) {
            alert('Vui lòng nhập tên tài khoản và mật khẩu!');
            if (usernameInput) usernameInput.focus();
            return;
        }
        const data = localStorage.getItem('emojithinking_user_' + username);
        if (!data) {
            alert('Tài khoản không tồn tại!');
            if (usernameInput) usernameInput.focus();
            return;
        }
        const userObj = JSON.parse(data);
        const pwHash = await sha256(pw);
        if (userObj.password !== pwHash) {
            alert('Mật khẩu không đúng!');
            if (passwordInput) passwordInput.focus();
            return;
        }
        currentUser = username;
        userData = userObj;
        showAccountInfo();
        if (loginSection) loginSection.style.display = 'none';
        if (gameSection) gameSection.style.display = '';
        if (profileBar) profileBar.style.display = '';
        startGame();
        if (passwordInput) passwordInput.value = '';
        // Lưu đăng nhập
        localStorage.setItem('emojithinking_logged_in_user', currentUser);
    };
}

// Khi đăng xuất
if (logoutBtn) {
    logoutBtn.onclick = () => {
        if (!currentUser) {
            alert('Bạn chưa đăng nhập!');
            return;
        }
        currentUser = null;
        userData = null;
        if (loginSection) loginSection.style.display = '';
        if (gameSection) gameSection.style.display = 'none';
        if (profileBar) profileBar.style.display = 'none';
        // Xóa lưu đăng nhập
        localStorage.removeItem('emojithinking_logged_in_user');
        alert('Đã đăng xuất thành công!');
    };
}

// --- CẬP NHẬT PROFILE BAR ---
function showAccountInfo() {
    if (!currentUser || !userData) return;
    
    if (accountName) accountName.textContent = `Tài khoản: ${currentUser}`;
    if (accountBest) accountBest.textContent = `Level cao nhất: ${userData.bestLevel} | Điểm cao nhất: ${userData.bestScore}`;
    
    // Hiển thị avatar ảnh nếu có, nếu không thì emoji
    if (profileAvatar) {
        if (userData.avatarImg) {
            profileAvatar.innerHTML = `<img src="${userData.avatarImg}" alt="avatar" style="width:38px;height:38px;border-radius:50%;object-fit:cover;vertical-align:middle;box-shadow:0 2px 8px #43c6ac33;">`;
        } else {
            profileAvatar.textContent = userData.avatar || '🧑';
        }
    }
    
    if (accountPoints) accountPoints.textContent = `Điểm: ${userData.points || 0}`;
    if (accountSkips) accountSkips.textContent = `Lượt bỏ qua: ${userData.skips || 0}`;
    
    if (currentUser && profileBar) {
        profileBar.style.display = '';
        var accInfo = document.querySelector('.account-info');
        if (accInfo) accInfo.style.display = 'none';
    } else if (profileBar) {
        profileBar.style.display = 'none';
    }
}

// --- ĐIỂM VÀ SKIP ---
function addPoints(n) {
    if (!userData) return;
    userData.points = (userData.points || 0) + n;
    saveUserData();
    showAccountInfo();
}

function useSkip() {
    if (!userData || (userData.skips || 0) <= 0) return false;
    userData.skips--;
    saveUserData();
    showAccountInfo();
    return true;
}

function buySkip() {
    if (!userData || (userData.points || 0) < 50) return false;
    userData.points -= 50;
    userData.skips = (userData.skips || 0) + 1;
    saveUserData();
    showAccountInfo();
    return true;
}

// --- SHOP MODAL ---
if (shopBtn) {
    shopBtn.onclick = () => {
        if (!currentUser) {
            alert('Bạn chưa đăng nhập!');
            return;
        }
        window.location.href = 'shop.html';
    };
}

if (closeShopModal) {
    closeShopModal.onclick = () => {
        if (shopModal) shopModal.style.display = 'none';
    };
}

if (buySkipBtn) {
    buySkipBtn.onclick = () => {
        if (buySkip()) {
            if (shopMessage) shopMessage.textContent = 'Đã mua 1 lượt bỏ qua!';
        } else {
            if (shopMessage) shopMessage.textContent = 'Bạn không đủ điểm!';
        }
    };
}

// Đóng modal khi click bên ngoài
window.addEventListener('click', (e) => {
    if (shopModal && e.target === shopModal) {
        shopModal.style.display = 'none';
    }
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
    if (!userData) return;
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
    if (!userData) {
        currentLevel = 1;
        current = 0;
        score = 0;
        levelIndexes = getRandomQuestionIndexes(1, 20);
        return;
    }
    
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
    if (!userData) {
        alert('Bạn chưa đăng nhập!');
        return;
    }
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

if (resetProgressBtn) {
    resetProgressBtn.onclick = resetProgress;
}

// --- GAME LOGIC ---
function showQuestion() {
    if (!hintEl || !emojiOptionsEl || !resultEl || !nextBtn || !scoreEl || !levelEl) {
        console.error('Không tìm thấy các phần tử game!');
        return;
    }
    
    // Lấy lại danh sách câu hỏi cho level hiện tại
    const levelQuestions = getQuestionsForLevel(currentLevel, levelIndexes);
    const q = levelQuestions[current];
    
    if (levelEl) levelEl.textContent = `Level ${currentLevel} / ${TOTAL_LEVELS}`;
    if (hintEl) hintEl.textContent = q.hint;
    if (resultEl) resultEl.textContent = '';
    if (nextBtn) nextBtn.style.display = 'none';
    if (emojiOptionsEl) emojiOptionsEl.innerHTML = '';
    
    q.options.forEach(emoji => {
        const btn = document.createElement('button');
        btn.className = 'emoji-btn';
        btn.textContent = emoji;
        btn.onclick = () => checkAnswer(emoji);
        if (emojiOptionsEl) emojiOptionsEl.appendChild(btn);
    });
    
    if (scoreEl) scoreEl.textContent = `Điểm: ${score}/${levelQuestions.length}`;
    updateSkipBtn();
}

// Khi trả lời đúng hoặc bỏ qua, lưu tiến trình
function checkAnswer(selected) {
    const levelQuestions = getQuestionsForLevel(currentLevel, levelIndexes);
    const q = levelQuestions[current];
    
    if (selected === q.answer) {
        if (resultEl) resultEl.textContent = '🎉 Chính xác!';
        score++;
        addPoints(10); // +10 điểm mỗi câu đúng
        Array.from(document.getElementsByClassName('emoji-btn')).forEach(btn => btn.disabled = true);
        if (nextBtn) nextBtn.style.display = 'inline-block';
    } else {
        if (resultEl) resultEl.textContent = '❌ Sai rồi, thử lại nhé!';
    }
    
    if (scoreEl) scoreEl.textContent = `Điểm: ${score}/${levelQuestions.length}`;
    saveProgress();
}

// --- SKIP BUTTON ---
function updateSkipBtn() {
    if (!skipBtn) return;
    
    if (userData && (userData.skips || 0) > 0) {
        skipBtn.style.display = '';
    } else {
        skipBtn.style.display = 'none';
    }
}

if (skipBtn) {
    skipBtn.onclick = () => {
        if (!currentUser) {
            alert('Bạn chưa đăng nhập!');
            return;
        }
        if (!userData || (userData.skips || 0) <= 0) {
            alert('Bạn không còn lượt bỏ qua!');
            return;
        }
        userData.skips--;
        saveUserData();
        current++;
        const levelQuestions = getQuestionsForLevel(currentLevel, levelIndexes);
        if (current < 20) {
            showQuestion();
        } else {
            if (nextBtn) nextBtn.onclick();
        }
    };
}

if (nextBtn) {
    nextBtn.onclick = () => {
        current++;
        const levelQuestions = getQuestionsForLevel(currentLevel, levelIndexes);
        if (current < 20) {
            showQuestion();
        } else if (currentLevel < TOTAL_LEVELS) {
            currentLevel++;
            current = 0;
            // Sinh lại danh sách câu hỏi mới cho level tiếp theo (nếu chưa có trong progress)
            if (userData && userData.progress && userData.progress.levelIndexes && userData.progress.levelIndexes[currentLevel]) {
                levelIndexes = userData.progress.levelIndexes[currentLevel].slice();
            } else {
                levelIndexes = getRandomQuestionIndexes(currentLevel, 20);
            }
            showQuestion();
        } else {
            if (hintEl) hintEl.textContent = 'Hoàn thành tất cả 50 level!';
            if (emojiOptionsEl) emojiOptionsEl.innerHTML = '';
            if (resultEl) resultEl.textContent = `Bạn đã trả lời đúng ${score}/${TOTAL_LEVELS * QUESTIONS_PER_LEVEL} câu!`;
            if (nextBtn) nextBtn.style.display = 'none';
            if (levelEl) levelEl.textContent = '';
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
}

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
            if (loginSection) loginSection.style.display = 'none';
            if (gameSection) gameSection.style.display = '';
            if (profileBar) profileBar.style.display = '';
            startGame();
        } else {
            localStorage.removeItem('emojithinking_logged_in_user');
        }
    }
});

// Lưu lại user cuối cùng khi đăng nhập
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        if (usernameInput && usernameInput.value.trim()) {
            localStorage.setItem('emojithinking_last_user', usernameInput.value.trim());
        }
    });
}

// Khởi tạo game khi trang load xong
window.addEventListener('DOMContentLoaded', () => {
    startGame();
    
    // Gán sự kiện cho các nút navigation
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const rankBtn = document.getElementById('rank-btn');
    
    if (editProfileBtn) {
        editProfileBtn.onclick = () => { 
            window.location.href = 'profile.html'; 
        };
    }
    
    if (rankBtn) {
        rankBtn.onclick = () => { 
            window.location.href = 'rank.html'; 
        };
    }
}); 