const http = require('http');

// Порт беремо з аргументів або ставимо 3000 за замовчуванням
const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Вправа 4.1: Головна сторінка (Текст)
  if (method === 'GET' && url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('Welcome to Manual HTTP Router');
  }

  // Вправа 4.2: TIME ROUTE (JSON)
  else if (method === 'GET' && url === '/time') {
    // 1. Встановлюємо заголовок для JSON
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    // 2. Створюємо об'єкт з часом
    const responseData = {
      now: new Date().toISOString()
    };
    
    // 3. Перетворюємо об'єкт у рядок JSON і відправляємо
    return res.end(JSON.stringify(responseData));
  }

  // Якщо шлях не знайдено
  else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});