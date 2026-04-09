const http = require('http');

const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  // Використовуємо modern URL API як у підказці
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const path = url.pathname;

  // [4.3] ECHO
  if (req.method === 'GET' && path === '/echo') {
    const msg = url.searchParams.get("msg") || "";
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end(msg);
  }

  // [4.4] SUM ROUTE
  else if (req.method === 'GET' && path === '/sum') {
    const aParam = url.searchParams.get("a");
    const bParam = url.searchParams.get("b");

    // ПЕРЕВІРКА: чи параметри взагалі є і чи вони є числами
    if (aParam === null || bParam === null || isNaN(aParam) || isNaN(bParam) || aParam === '' || bParam === '') {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ "error": "Invalid numbers" }));
    }

    const a = Number(aParam);
    const b = Number(bParam);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ "sum": a + b }));
  }

  // [4.1] ROOT (про всяк випадок)
  else if (req.method === 'GET' && path === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('Welcome to Manual HTTP Router');
  }

  // 404 для всього іншого
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(port);