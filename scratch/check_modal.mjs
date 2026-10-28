import fs from 'fs';
const html = fs.readFileSync('scratch/monique_lookbook.html', 'utf8');
const lastDetailsSlide = html.indexOf('data-share-id="26769522098373"');
console.log('lastDetailsSlide:', lastDetailsSlide);
if (lastDetailsSlide !== -1) {
  console.log(html.slice(lastDetailsSlide, lastDetailsSlide + 3000));
}
