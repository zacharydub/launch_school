function featured(num) {
  let iterator = num;
  while (true) {
    iterator++;
    if (iterator % 2 === 1 && iterator % 7 === 0 && unique(iterator)) return iterator
  }
}
function unique(num) {
  let str = String(num);
  let obj = {}
  for (let i = 0; i < str.length; i++) {
    if (obj[str[i]]) {
      return false;
    } else {
      obj[str[i]] = true;
    }
  }
  return true;
}

console.log(featured(12));           // 21
console.log(featured(20));           // 21
console.log(featured(21));           // 35
console.log(featured(997));          // 1029
console.log(featured(1029));         // 1043
console.log(featured(999999));       // 1023547
console.log(featured(999999987));    // 1023456987
