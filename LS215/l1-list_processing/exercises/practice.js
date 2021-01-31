//remove dupes from array

let arr = [1, 1, 2, 3]

let newarr = []
arr.forEach(elm => {
  if (!newarr.includes(elm)) {
    newarr.push(elm)
  }
})

console.log(newarr)
