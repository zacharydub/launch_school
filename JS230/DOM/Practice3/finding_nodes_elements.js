//based on this HTML - https://d3905n0khyu9wc.cloudfront.net/the_dom/polar_bear_wiki.html

//1
//Write some JavaScript code to retrieve a word count for each h2 heading on the page.
let headings = document.querySelectorAll('h2')
let headingsArr = Array.prototype.slice.call(headings)
headingsArr.map(elm => elm.textContent.split(" ").length)

//2
//The page has a table of contents with the title "Contents" and links to the different content sections on "Naming and etymology," "Taxonomy and evolution," etc.
//Use three different DOM methods to retrieve a reference to the div element that contains the table of contents.
document.querySelector('#toc')
document.querySelectorAll('.toc')[0]
document.getElementById('toc')

//3
//Write some JavaScript code to change the color for every odd indexed link in the table of contents to green.

let links = document.querySelectorAll('.toc a');

for (let index = 0; index < links.length; index += 1) {
  if (index % 2 === 1) {
    links[index].style.color = 'green';
  }
}

//4
//Write some JavaScript code to retrieve the text of every thumbnail caption on the page.

let nodes = document.querySelectorAll('.thumbcaption');
let captions = [];

for (let index = 0; index < nodes.length; index += 1) {
  captions.push(nodes[index].textContent.trim());
}

console.log(captions);

//5
//You can think of the scientific classification of an animal as a series of key-value pairs. Here, the keys are taxonomic ranks (Domain, Kingdom, Phylum, etc.). The values are the specific groups to which the animal belongs.
//Write JavaScript code that extracts the classification of animals from the web page and logs an Object that uses the ranks as keys and the groups as values. You may assume the taxonomic ranks to use as keys is provided for you as an array.
let keys = ['Kingdom', 'Phylum', 'Clade', 'Class', 'Order', 'Suborder', 'Family',
  'Genus', 'Species'];
let classification = {};
let tds = document.querySelectorAll('.infobox td');
let cell;
let link;

for (index = 0; index < tds.length; index += 1) {
  cell = tds[index];

  keys.forEach(key => {
    if (cell.textContent.indexOf(key) !== -1) {
      link = cell.nextElementSibling.firstElementChild;
      classification[key] = link.textContent;
    }
  });
}

console.log(classification);
