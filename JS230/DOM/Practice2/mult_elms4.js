//Update the answer to question 3 of problem group 1 to use the document.getElementsByTagName method
let paragraphs = document.getElementsByTagName('p');
for (let index = 0; index < paragraphs.length; index += 1) {
  paragraphs[index].classList.add('article-text');
}
