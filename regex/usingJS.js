// Write a method that returns true if its argument looks like a URL, false if it does not.

//   isUrl('http://launchschool.com');   // -> true
// isUrl('https://example.com');       // -> true
// isUrl('https://example.com hello'); // -> false
// isUrl('   https://example.com');    // -> false

// Solution
// let isUrl = function (text) {
//   return !!text.match(/^https?:\/\/\S+$/);
// };
// Note that we use!! to coerce the result of our match call to a boolean value.

// Write a method that returns all of the fields in a haphazardly formatted string.A variety of spaces, tabs, and commas separate the fields, with possibly multiple occurrences of each delimiter.

//   fields("Pete,201,Student");
// // -> ['Pete', '201', 'Student']

// fields("Pete \t 201    ,  TA");
// // -> ['Pete', '201', 'TA']

// fields("Pete \t 201");
// // -> ['Pete', '201']

// fields("Pete \n 201");
// // -> ['Pete', "\n", '201']

// let fields = function (str) {
//   return str.split(/[ \t,]+/);
// };
// Note that we don't use \s here since we want to split at spaces and tabs, not other whitespace characters.

// Write a method that changes the first arithmetic operator(+, -, *, /) in a string to a '?' and returns the resulting string. Don't modify the original string.

// mysteryMath('4 + 3 - 5 = 2');
// // -> '4 ? 3 - 5 = 2'

// mysteryMath('(4 * 3 + 2) / 7 - 1 = 1');
// // -> '(4 ? 3 + 2) / 7 - 1 = 1'

// let mysteryMath = function (equation) {
//   return equation.replace(/[+\-*\/]/, '?');
// };
// Note that we need to escape the - character in our character class to interpret as a literal hyphen, not a range specification.We also must escape the / character in the Ruby code; in the JavaScript code, we don't need to escape the / character but do so here for consistency.


// Write a method that changes every arithmetic operator(+, -, *, /) to a '?' and returns the resulting string. Don't modify the original string.

// mysteriousMath('4 + 3 - 5 = 2');           // -> '4 ? 3 ? 5 = 2'
// mysteriousMath('(4 * 3 + 2) / 7 - 1 = 1'); // -> '(4 ? 3 ? 2) ? 7 ? 1 = 1'

// let mysteriousMath = function (equation) {
//   return equation.replace(/[+\-*\/]/g, '?')
// }

// Note that we apply the g option to the regex in JavaScript.

// Write a method that changes the first occurrence of the word apple, blueberry, or cherry in a string to danish.

//   danish('An apple a day keeps the doctor away');
// // -> 'An danish a day keeps the doctor away'

// danish('My favorite is blueberry pie');
// // -> 'My favorite is danish pie'

// danish('The cherry of my eye');
// // -> 'The danish of my eye'

// danish('apple. cherry. blueberry.');
// // -> 'danish. cherry. blueberry.'

// danish('I love pineapple');
// // -> 'I love pineapple'

// let danish = function (string) {
//   return string.replace(/\b(apple|blueberry|cherry)\b/, 'danish')
// }
// Note that pineapple is not changed in the last example since we defined the word boundary


// Challenge: write a method that changes dates in the format 2016 - 06 - 17 to the format 17.06.2016.You must use a regular expression and should use methods described in this section.

//   formatDate('2016-06-17'); // -> '17.06.2016'
// formatDate('2016/06/17'); // -> '2016/06/17' (no change)

// let formatDate = function (original_date) {
//   return original_date.replace(/^(\d\d\d\d)-(\d\d)-(\d\d)$/, '$3.$2.$1');
// };
// We use three capture groups here to capture the year, month, and date, then use them in the replacement string in reverse order, this time separated by periods instead of hyphens.

//   Challenge: write a method that changes dates in the format 2016 - 06 - 17 or 2016 / 06 / 17 to the format 17.06.2016.You must use a regular expression and should use methods described in this section.

//     formatDate('2016-06-17'); // -> '17.06.2016'
// formatDate('2017/05/03'); // -> '03.05.2017'
// formatDate('2015/01-31'); // -> '2015/01-31' (no change)

// let formatDate = function (originalDate) {
//   return originalDate.replace(/^(\d\d\d\d)-(\d\d)-(\d\d)$/, '$3.$2.$1')
//     .replace(/^(\d\d\d\d)\/(\d\d)\/(\d\d)$/, '$3.$2.$1');
// };
// Alternate solution:

// Copy Code
// let formatDate = function (originalDate) {
//   let dateRegex = /^(\d\d\d\d)([\-\/])(\d\d)\2(\d\d)$/;
//   return originalDate.replace(dateRegex, '$4.$3.$1');
// };
// The easiest way to approach this problem is to split it into smaller sub - problems, one that handles dates in 2016 - 05 - 17 format, and one that handles 2016 / 05 / 17 format, which is what both of our primary solutions do.One possible gotcha here is that you must remember to escape the / characters in the regex.

// You can solve this problem with one regex, as in our alternate solutions, but at the expense of a more complex regex and lowered readability.The regex adds one additional capture group to capture the first - or /, and uses a \2 backreference to refer back to that capture in the regex.However, this additional capture group modifies the backreference numbers for the month and day components of the date, so we now need to refer to them as $4 and $3 in JavaScript.

// Note that our alternate solutions use variables to store the regex.We do this both for readability, and to show that regex are no different than any other object; you can manipulate and pass them around as needed.
