import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.pdf': 'application/pdf',
  '.webp': 'image/webp',
};

export function createPortfolioServer() {
  return createServer(async (request, response) => {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }
    let filename;
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      filename = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
      if (!filename.startsWith(root + sep)) {
        response.writeHead(403).end();
        return;
      }
      if (filename !== resolve(root, 'index.html') && !filename.startsWith(resolve(root, 'assets') + sep)) {
        response.writeHead(404).end();
        return;
      }
    } catch {
      response.writeHead(400).end();
      return;
    }
    try {
      const bytes = await readFile(filename);
      response.writeHead(200, {
        'Content-Type': contentTypes[extname(filename)] || 'application/octet-stream',
        'Content-Length': bytes.length,
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      });
      response.end(request.method === 'HEAD' ? undefined : bytes);
    } catch {
      response.writeHead(404).end();
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const port = Number(process.env.PORT || 4173);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be an integer from 1 to 65535.');
  const server = createPortfolioServer();
  server.on('error', error => { console.error(error.message); process.exitCode = 1; });
  server.listen(port, '127.0.0.1', () => console.log(`Portfolio: http://127.0.0.1:${port}`));
}
