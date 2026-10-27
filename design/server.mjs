/* Liten statisk server for designarbeidet.
 *
 * GitHub Pages bruker minutter på å rulle ut, og et utkast skal kunne ses
 * med én gang. Denne serverer design-mappa på http://localhost:4321/ og
 * gir inspect.mjs noe å måle på. Den rører ikke appen.
 *
 *   node design/server.mjs
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const ROT = fileURLToPath(new URL(".", import.meta.url));
const PORT = Number(process.env.PORT) || 4321;

const TYPER = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2"
};

createServer(async (req, res) => {
  // Stien skal holde seg innenfor design-mappa, uansett hva som kommer inn.
  const bane = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let fil = normalize(join(ROT, bane)).replace(/\\/g, "/");
  if (!fil.startsWith(ROT.replace(/\\/g, "/"))) {
    res.writeHead(403).end("Nei");
    return;
  }

  try {
    const s = await stat(fil).catch(() => null);
    if (s?.isDirectory()) fil = join(fil, "index.html");
    const kropp = await readFile(fil);
    res.writeHead(200, {
      "Content-Type": TYPER[extname(fil).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(kropp);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Fant ikke " + bane);
  }
}).listen(PORT, () => {
  console.log(`Designmappa ligger på http://localhost:${PORT}/`);
  console.log(`Nytt utkast:          http://localhost:${PORT}/v2/`);
});
