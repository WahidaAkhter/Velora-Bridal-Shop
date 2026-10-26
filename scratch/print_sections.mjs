import fs from 'fs';

const filePath = 'C:\\Users\\mdsiu\\.gemini\\antigravity-ide\\brain\\d9d60325-2bad-4df7-9afa-6f10c2de9e4a\\.system_generated\\steps\\1165\\content.md';
const content = fs.readFileSync(filePath, 'utf-8');

const bodyIdx = content.indexOf('<body');
const bodyContent = bodyIdx !== -1 ? content.slice(bodyIdx) : content;

const sectionMatches = bodyContent.match(/<section[^>]*>[\s\S]*?<\/section>/gi) || [];

for (let i = 1; i <= 6; i++) {
  if (sectionMatches[i]) {
    console.log(`\n=================== SECTION ${i} ===================`);
    console.log(sectionMatches[i]);
  }
}
