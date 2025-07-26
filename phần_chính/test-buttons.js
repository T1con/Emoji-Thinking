// Test script đơn giản để kiểm tra các nút
console.log('Test script loaded!');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - Testing buttons...');
    
    // Test nút đăng nhập
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        console.log('✅ Tìm thấy login-btn');
        loginBtn.onclick = function() {
            alert('Nút đăng nhập hoạt động!');
        };
    } else {
        console.error('❌ Không tìm thấy login-btn');
    }
    
    // Test nút đăng ký mới
    const switchToRegister = document.getElementById('switch-to-register');
    if (switchToRegister) {
        console.log('✅ Tìm thấy switch-to-register');
        switchToRegister.onclick = function() {
            alert('Nút đăng ký mới hoạt động!');
        };
    } else {
        console.error('❌ Không tìm thấy switch-to-register');
    }
    
    // Test nút đăng ký
    const registerBtn = document.getElementById('register-btn');
    if (registerBtn) {
        console.log('✅ Tìm thấy register-btn');
        registerBtn.onclick = function() {
            alert('Nút đăng ký hoạt động!');
        };
    } else {
        console.error('❌ Không tìm thấy register-btn');
    }
    
    // Test nút quay lại đăng nhập
    const switchToLogin = document.getElementById('switch-to-login');
    if (switchToLogin) {
        console.log('✅ Tìm thấy switch-to-login');
        switchToLogin.onclick = function() {
            alert('Nút quay lại đăng nhập hoạt động!');
        };
    } else {
        console.error('❌ Không tìm thấy switch-to-login');
    }
    
    console.log('Test hoàn thành!');
}); 