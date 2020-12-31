// Write a regex that matches an uppercase K. Test it with these strings:

// Copy Code
// Kx
// BlacK
// kelly
// There should be two matches.

// Solution
// Copy Code
// /K/
// The correct matches are K at the beginning of line 1, and K at the end of line 2.

// Write a regex that matches an uppercase or lowercase H. Test it with these strings:

// Copy Code
// Henry
// perch
// golf
// There should be two matches.

// Solution
// Copy Code
// /h/i
// An alternative solution is to use alternation:

// Copy Code
// /(h|H)/
// The correct matches are H at the beginning of line 1, and h at the end of line 2.

// Can you think of a situation where you might want to use alternation instead of the i option?

// Write a regex that matches the string dragon. Test it with these strings:

// Copy Code
// snapdragon
// bearded dragon
// dragoon
// There should be two matches.

// Solution
// Copy Code
// /dragon/
// The regex should match the word dragon at the end of lines 1 and 2.

// Write a regex that matches any of the following fruits: banana, orange, apple, strawberry. The fruits may appear in other words. Test it with these strings:

// Copy Code
// banana
// orange
// pineapples
// strawberry
// raspberry
// grappler
// There should be five matches.

// Solution
// Copy Code
// /(banana|orange|apple|strawberry)/
// Note that our regex matches apple in the words pineapples and grappler. You'll learn how to prevent this later on.

// The solution matches everything except raspberry.

// Write a regex that matches a comma or space. Test your regex with these strings:

// Copy Code
// This line has spaces
// This,line,has,commas,
// No-spaces-or-commas
// There should be seven matches.

// Solution
// Copy Code
// /( |,)/
// The expression should match three spaces on line 1 and four commas on line 2.

// Challenge: Write a regex that matches blueberry or blackberry, but write berry precisely once. Test it with these strings:

// Copy Code
// blueberry
// blackberry
// black berry
// strawberry
// There should be two matches.

// Hint: you need both concatenation and alternation.

// Solution
// Copy Code
// /(blue|black)berry/
// The key to this challenge is that concatenation works with patterns, not characters. Thus, we can concatenate (blue|black) with berry to produce the final result.

// The expression matches the first two lines.

// How come the regex doesn't match black berry?