//Write a function that generates and returns an acronym from a string of words. For example, the function should return "PNG" for the string "Portable Network Graphics". Count compound words (words connected with a dash) as separate words.
function acronym(string) {
  string = string.replace('-', " ")
  return string
  //let arr = string.split(" ")
  //for (let i = 0; i < arr.length; i++) {
  //  if (arr[i].match(/\-/)) {
  //    arr[i] = arr[i].split('-')
  //  }
  //}
  //let flat = arr.flatMap(elm => elm)
  //let returnstr = ''
  //flat.forEach(elm => {
  //  returnstr += elm[0].toUpperCase()
  //})
  //return returnstr
}

console.log(acronym('Portable Network Graphics'));                  // "PNG"
console.log(acronym('First In, First Out'));                        // "FIFO"
console.log(acronym('PHP: HyperText Preprocessor'));                // "PHP"
console.log(acronym('Complementary metal-oxide semiconductor'));    // "CMOS"
console.log(acronym('Hyper-text Markup Language'));                 // "HTML"

//ALTERNATE
function acronym(string) {
  let stringArray = string.replace(/-/g, ' ').split(' ');
  let initials = stringArray.map(word => word[0].toUpperCase());
  return initials.join('');
}
