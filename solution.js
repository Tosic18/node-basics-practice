const http = require('http');

const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  // Використовуємо modern URL API згідно з підказкою
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const path = url.pathname;

  // [4.1] ROOT ROUTE
  if (req.method === 'GET' && path === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('Welcome to Manual HTTP Router');
  }

  // [4.2] TIME ROUTE
  else if (req.method === 'GET' && path === '/time') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ now: new Date().toISOString() }));
  }

  // [4.3] ECHO ROUTE (Виправлено згідно з image_ac2dfc.png)
  else if (req.method === 'GET' && path === '/echo') {
    // Воркшоп хоче параметр "msg", а не "message"
    const msg = url.searchParams.get("msg") || "";
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end(msg);
  }

  // 404
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(port);