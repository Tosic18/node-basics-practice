const http = require('http');

const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const path = url.pathname;

  // [4.1] ROOT
  if (req.method === 'GET' && path === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('Welcome to Manual HTTP Router');
  }

  // [4.2] TIME
  else if (req.method === 'GET' && path === '/time') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ now: new Date().toISOString() }));
  }

  // [4.3] ECHO
  else if (req.method === 'GET' && path === '/echo') {
    const msg = url.searchParams.get("msg") || "";
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end(msg);
  }

  // [4.4] SUM
  else if (req.method === 'GET' && path === '/sum') {
    const aParam = url.searchParams.get("a");
    const bParam = url.searchParams.get("b");

    if (aParam === null || bParam === null || isNaN(aParam) || isNaN(bParam)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ "error": "Invalid numbers" }));
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ "sum": Number(aParam) + Number(bParam) }));
  }

  // [4.5] NOT FOUND (Виправлено під вимогу image_ac8f58.png)
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ "error": "Not found" }));
  }
});

server.listen(port);