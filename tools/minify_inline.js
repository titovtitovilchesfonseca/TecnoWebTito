#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const infile = process.argv[2];
const outfile = process.argv[3];
if(!infile || !outfile){
  console.error('Usage: node minify_inline.js input.html output.html');
  process.exit(1);
}
let s = fs.readFileSync(infile, 'utf8');
// Remove HTML comments
s = s.replace(/<!--([\s\S]*?)-->/g, '');

// Minify <style> blocks
s = s.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, (m) => {
  const inner = m.replace(/<style\b[^>]*>|<\/style>/gi, '');
  const min = inner.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
  return '<style>' + min + '</style>';
});

// Minify <script> blocks
s = s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (m) => {
  const open = m.match(/<script\b[^>]*>/i)[0];
  const inner = m.replace(/<script\b[^>]*>|<\/script>/gi, '');
  // Remove block comments and line comments
  let min = inner.replace(/\/\*[\s\S]*?\*\//g, '');
  min = min.replace(/(^|[^:\\])\/\/.*(?=[\n\r])/g, '$1');
  min = min.replace(/\s+/g, ' ').trim();
  return open + min + '</script>';
});

// Collapse whitespace between tags
s = s.replace(/>\s+</g, '><').trim();

fs.writeFileSync(outfile, s, 'utf8');
console.log('WROTE', path.basename(outfile));
