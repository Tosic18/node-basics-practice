const http = require('http');

// Отримуємо порт з аргументів командного рядка (як просить інструкція Debug)
const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  // Перевіряємо шлях '/' та метод 'GET'
  if (req.url === '/' && req.method === 'GET') {
    // 1. Встановлюємо статус код 200
    // 2. Встановлюємо заголовок Content-Type
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    
    // 3. Надсилаємо текст
    res.end('Welcome to Manual HTTP Router');
  } else {
    // Для інших шляхів повертаємо 404 (це хороший тон)
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});