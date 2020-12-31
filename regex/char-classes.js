// Write a regex that matches uppercase or lowercase Ks or a lowercase s.Test it with these strings:

// Copy Code
// Kitchen Kaboodle
// Reds and blues
// kitchen Servers
// There should be six matches.

//   Solution
// Copy Code
//   / [Kks] /
//   This expression matches two Ks, one k, and three s characters.Note that it does not match the uppercase S in Servers.

// Write a regex that matches any of the strings cat, cot, cut, bat, bot, or but, regardless of case.Test it with this text:

// Copy Code
// My cats, Butterscotch and Pudding, like to
// sleep on my cot with me, but they cut my sleep
// short with acrobatics when breakfast time rolls
// around.I need a robotic cat feeder.
// There should be nine matches.

//   Solution
// Copy Code
//   / [bc][aou]t / i
// If your pattern is somewhat different, check yourself against these matches:

// Line 1: cat in cats; But and cot in Butterscotch
// Line 2: cot, but, cut
// Line 3: bat in acrobatics
// Line 4: bot in robotic; cat

// Base 20 digits include the decimal digits 0 through 9, and the letters A through J in upper or lowercase.Write a regex that matches base 20 digits.Test it with these strings:

// Copy Code
// 0xDEADBEEF
// 1234.5678
// Jamaica
// plow ahead
// There should be 28 matches.

//   Solution
// Copy Code
//   / [0 - 9a - jA - J] /
//   Alternate solution:

// Copy Code
//   / [0 - 9a - j] / i
// these patterns match everything in the sample text except:

// x on line 1
//   .on line 2
// m on line 3
// p, l, o, w, and(space) on line 4


// Write a regex that matches any letter except x or X.Test it with these strings:
// Copy Code
// 0x1234
// Too many XXXXXXXXXXxxxxxxXXXXXXXXXXXX to count.
// The quick brown fox jumps over the lazy dog
// THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG
// There should be 82 matches.

//   Solution
// Copy Code
//   / [A - WYZa - wyz] /
//   This solution should match nearly everything in the sample text except:

// the entire first line
// none of the spaces
// none of the x or X characters
// the.at the end of line 2
// Why is / [^ xX] / not a valid answer to the previous exercise ?

//   Solution
//   / [^ Xx] / matches everything except x and X.We asked for an answer that matches any letter other than x or X.

// Write a regex that matches any character that is not a letter.Test it with these strings:

// Copy Code
// 0x1234abcd
// 1, 000, 000, 000s and 1, 000, 000, 000s.
// THE quick BROWN fox JUMPS over THE lazy DOG!
// There should be 45 - 46 matches.

//   Solution
// Copy Code
//   / [^ a - z] / i
// This regex matches the following characters:

// Line 1: 0, 1, 2, 3, 4, and the newline.
//   Line 2: Eighteen 0s, two 1s, six, s(commas), two spaces, a period, and the newline.
//     Line 3: Eight spaces, one!, and the newline(if present).


//       Are / (ABC | abc) / and / [Aa][Bb][Cc] / equivalent regex ? If not, how do they differ ? Can you provide an example of a string that would match one of these regex, but not the other ?

//         Solution
// The patterns are not equivalent.The former matches nothing but the strings ABC or abc; the latter matches any string consisting of the letters a, b, c in sequence, regardless of case.The string Abc would match the second pattern, but not the first.

//   Are / abc / i and / [Aa][Bb][Cc] / equivalent regex ? If not, how do they differ ? Can you provide an example of a string that would match one of these regex, but not the other ?

//     Solution
// The patterns are equivalent as specified; however, that equivalence may not survive a small modification to either pattern.For instance, /abcd/i is not equivalent to / [Aa][Bb][Cc]d /.

//   Challenge: write a regex that matches a string that looks like a simple negated character class range, e.g., '[^a-z]'. (Your answer should match precisely six characters.) Test it with these strings:

//   Copy Code
// The regex / [^ a - z] / i matches any character that is
// not a letter.Similarly, /[^0-9]/ matches any
// non - digit while /[^A-Z]/ matches any character
// that is not an uppercase letter.Beware: /[^+-<]/
// is at best obscure, and may even be wrong.
// There should be three matches.

//   Solution
// Copy Code
//   /\[\^ [0 - 9A - Za - z] - [0 - 9A - Za - z]\] /
//     or

// Copy Code
//   / [\[][\^][0 - 9A - Za - z]-[0 - 9A - Za - z][\]]/
// There are six patterns in each of these regex:

// Pattern	Explanation
// \[or[\[]	a literal[
//   \^ or[\^]	a literal ^
//     [0 - 9A - Za - z]	any of the usual character class range starting values
//       - a literal '-'
//       [0 - 9A - Za - z]any of the usual character class range ending values
// \]or[\]]a literal ]
// The three matches are / [^ a - z] / i, /[^0-9]/, and / [^ A - Z] /.Technically, the last regex string in our sample text, /[^+-<]/, is a valid regex; there is nothing illegal about character class ranges that don't use alphanumeric starting and ending points. However, you should avoid such ranges; think of them as invalid.