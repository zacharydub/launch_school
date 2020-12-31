//sort()

//sort this nested array in ascending order
let scores = [[3, 6, 4], [6, 8, 9], [1, 4, 2]];
//solution
scores.sort((a, b) => {
  let totalAScore = a.reduce((number, next) => number + next);
  let totalBScore = b.reduce((number, next) => number + next);
  return totalAScore - totalBScore;
});
//end
console.log(scores)
//playing around with sorting each nested array
for (let i = 0; i < scores.length; i++) {
  scores[i].sort((a, b) => a - b)
}
console.log(scores)