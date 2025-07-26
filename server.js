const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// MIME types cho các file
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // Xử lý CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    let filePath = req.url;
    
    // Mặc định là index.html nếu truy cập root
    if (filePath === '/') {
        filePath = '/phần_chính/index.html';
    }
    
    // Thêm đường dẫn thư mục nếu cần
    if (!filePath.startsWith('/phần_chính/') && !filePath.startsWith('/node_modules/')) {
        filePath = '/phần_chính' + filePath;
    }

    // Lấy đường dẫn tuyệt đối
    const absolutePath = path.join(__dirname, filePath);

    // Kiểm tra file có tồn tại không
    fs.access(absolutePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File không tồn tại, trả về 404
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`
                <html>
                <head><title>404 - Không tìm thấy</title></head>
                <body>
                    <h1>404 - Không tìm thấy</h1>
                    <p>File ${filePath} không tồn tại.</p>
                    <a href="/">Quay về trang chủ</a>
                </body>
                </html>
            `);
            return;
        }

        // Đọc file
        fs.readFile(absolutePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                    <html>
                    <head><title>500 - Lỗi server</title></head>
                    <body>
                        <h1>500 - Lỗi server</h1>
                        <p>Không thể đọc file ${filePath}.</p>
                        <a href="/">Quay về trang chủ</a>
                    </body>
                    </html>
                `);
                return;
            }

            // Xác định MIME type
            const ext = path.extname(absolutePath).toLowerCase();
            const contentType = mimeTypes[ext] || 'application/octet-stream';

            // Trả về file
            res.writeHead(200, { 
                'Content-Type': contentType + (contentType.startsWith('text/') ? '; charset=utf-8' : '')
            });
            res.end(data);
        });
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
    console.log(`📁 Thư mục gốc: ${__dirname}`);
    console.log(`🎮 Mở trình duyệt và truy cập: http://localhost:${PORT}`);
    console.log(`⏹️  Nhấn Ctrl+C để dừng server`);
});

// Xử lý tắt server
process.on('SIGINT', () => {
    console.log('\n👋 Tắt server...');
    server.close(() => {
        console.log('✅ Server đã tắt.');
        process.exit(0);
    });
}); 