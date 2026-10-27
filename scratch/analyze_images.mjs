import fs from 'fs';
import path from 'path';

const dataDir = './src/data';
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.js'));
const urls = new Set();
const localPaths = new Set();

for (const file of files) {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
  const matches = content.match(/https?:\/\/[^\s'",]+/g) || [];
  matches.forEach(u => urls.add(u));
  const localMatches = content.match(/\/images\/[^\s'",]+/g) || [];
  localMatches.forEach(l => localPaths.add(l));
}

console.log('Remote URLs count:', urls.size);
console.log('Local /images/ paths count:', localPaths.size);
console.log('Sample Remote URLs:', Array.from(urls).slice(0, 10));
