#!/usr/bin/env node
// Parsea index.html y genera sitemap.xml con todos los productos e imágenes.
// Uso: node scripts/generate-sitemap.js
// Se ejecuta automáticamente en cada deploy de Vercel (ver vercel.json).

const fs   = require('fs');
const path = require('path');

const BASE_URL  = 'https://donflores.vercel.app';
const ROOT      = path.join(__dirname, '..');
const HTML_PATH = path.join(ROOT, 'index.html');
const OUT_PATH  = path.join(ROOT, 'sitemap.xml');
const TODAY     = new Date().toISOString().split('T')[0];

const html = fs.readFileSync(HTML_PATH, 'utf-8');

// Eliminar comentarios HTML para no capturar productos/imágenes comentados
const stripped = html.replace(/<!--[\s\S]*?-->/g, '');

// ── Imágenes ──────────────────────────────────────────────────────────────────
const imgRe   = /<img[^>]+src="(\/image\/[^"]+)"(?:[^>]*alt="([^"]*)")?/g;
const seenImg = new Set();
const images  = [];
let m;
while ((m = imgRe.exec(stripped)) !== null) {
  const src = m[1];
  const alt = (m[2] || '').trim();
  if (!seenImg.has(src)) {
    seenImg.add(src);
    images.push({ src, alt });
  }
}

// ── Productos ─────────────────────────────────────────────────────────────────
const productRe = /data-name="([^"]+)"/g;
const products  = [];
while ((m = productRe.exec(stripped)) !== null) products.push(m[1]);

// ── Secciones (IDs de <section>) ──────────────────────────────────────────────
const sectionRe = /<section[^>]+id="([^"]+)"/g;
const sections  = [];
while ((m = sectionRe.exec(stripped)) !== null) sections.push(m[1]);

// ── Helpers ───────────────────────────────────────────────────────────────────
function escXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildImageTags(imgs) {
  return imgs
    .map(({ src, alt }) => {
      const locLine   = `      <image:loc>${BASE_URL}${encodeURI(src)}</image:loc>`;
      const titleLine = alt ? `\n      <image:title>${escXml(alt)}</image:title>` : '';
      return `    <image:image>\n${locLine}${titleLine}\n    </image:image>`;
    })
    .join('\n');
}

// ── Sitemap XML ───────────────────────────────────────────────────────────────
// Google ignora fragmentos (#), así que la homepage abarca todas las secciones.
// Se incluye la imagen:image extension para que Google indexe las fotos de productos.
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!--
  Don Flores — sitemap generado automáticamente.
  Productos (${products.length}): ${products.join(', ')}.
  Secciones: ${sections.join(', ')}.
  Regenerar: node scripts/generate-sitemap.js
-->
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${buildImageTags(images)}
  </url>

</urlset>
`;

fs.writeFileSync(OUT_PATH, xml, 'utf-8');

console.log('✅  sitemap.xml generado');
console.log(`    Productos : ${products.length} (${products.join(', ')})`);
console.log(`    Imágenes  : ${images.length}`);
console.log(`    Secciones : ${sections.join(', ')}`);
console.log(`    Lastmod   : ${TODAY}`);
