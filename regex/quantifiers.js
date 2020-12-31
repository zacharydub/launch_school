// Write a regex that matches any word that begins with b and ends with an e, and has any number of letters in-between. You may limit your regex to lowercase letters. Test it with these strings.

// Copy Code
// To be or not to be
// Be a busy bee
// I brake for animals.
// There should be four matches.

// Solution
// Copy Code
// /\bb[a-z]*e\b/
// This regex should match the words be (both instances), bee, and brake.

// Write a regex that matches any line of text that ends with a ?. Test it with these strings.

// Copy Code
// What's up, doc?
// Say what? No way.
// ?
// Who? What? Where? When? How?
// There should be three matches.

// Solution
// Copy Code
// /^.*\?$/
// This regex should match the first, third, and fourth lines, but not the second line. Note the use of .*; you'll see this often in regex. It matches any sequence of characters, but, by default, does not match a newline character. It's how you ignore everything between two points when matching.

// Note that the ? must be \-escaped since we want to match a literal ?.

// Write a regex that matches any line of text that ends with a ?, but does not match a line that consists entirely of a single ?. Test it with the strings from the previous exercise.

// There should be two matches.

// Solution
// Copy Code
// /^.+\?$/
// This regex should match the first and fourth lines, but not the second or third. The .+ pattern makes the regex match at least one character before it attempts to match the ?.

// Write a regex that matches any line of text that contains nothing but a URL. For this exercise, a URL begins with http:// or https://, and continues until it detects a whitespace character or end of line. Test your regex with these strings:

// Copy Code
// http://launchschool.com/
// https://mail.google.com/mail/u/0/#inbox
// htpps://example.com
// Go to http://launchschool.com/
// https://user.example.com/test.cgi?a=p&c=0&t=0&g=0 hello
//     http://launchschool.com/
// There should be two matches.

// Solution
// Copy Code
// /^https?:\/\/\S*$/
// This regex should match the first and second text lines, but none of the others. The third line doesn't match because of a misspelling; the fourth and fifth don't match because of extra content, and the last doesn't match because of the leading spaces.

// The regex begins with a line anchor, ^, and then the http part of the URL followed by an optional s. Next, we have the :, and two / characters (both / characters must be \-escaped). We then have the rest of the URL, which we achieve by matching a string of non-whitespace characters. We also require an explicit line anchor, $, to prevent matching a URL that isn't at the end of the line.

// Modify your regex from the previous exercise so the URL can have optional leading or trailing whitespace, but is otherwise on a line by itself. To test your regex with trailing whitespace, you must add some spaces to the end of some lines in your sample text.

// There should be three matches.

// Solution
// Copy Code
// /^\s*https?:\/\/\S*\s*$/
// This regex should match the URLs on the first, second, and last lines.

// Modify your regex from the previous exercise so the URL can appear anywhere on each line, so long as it begins at a word boundary.

// There should be five matches.

// Solution
// Copy Code
// /\bhttps?:\/\/\S*/
// This solution should match all of the URLs above. (Note that the third line is a not a URL.)

// Write a regex that matches any word that contains at least three occurrences of the letter i. Test your regex against these strings:

// There should be three matches.

// Copy Code
// Mississippi
// ziti 0minimize7
// inviting illegal iridium
// Solution
// Copy Code
// /\b[a-z]*i[a-z]*i[a-z]*i[a-z]*\b/i
// Alternate solution

// Copy Code
// /\b([a-z]*i){3}[a-z]*\b/i
// Your solution should match Mississippi, inviting, and iridium. We use word boundary anchors in our solution to guard against strings that aren't words, such as 0minimize7). Each [a-z]*i matches a sequence of 0 or more letters followed by the letter i. Connecting three occurrences of [a-z]*i and then adding one more [a-z]* to the end, we get a regex that matches any word with 3 is.

// Our alternate solution is similar, but it uses the {3} quantifier to perform the 3-occurrences part of the match. The quantifier applies to ([a-z]*i) which, uses grouping parentheses to treat [a-z]*i as a single pattern for use by {3}.

// Write a regex that matches the last word in each line of text. For this exercise, assume that words are any sequence of non-whitespace characters. Test your regex against these strings:

// Copy Code
// What's up, doc?
// I tawt I taw a putty tat!
// Thufferin' thuccotath!
// Oh my darling, Clementine!
// Camptown ladies sing this song, doo dah.
// There should be five matches.

// Solution
// Copy Code
// /\S+$/
// Your solution should match doc?, tat!, thuccotath!, Clementine!, and dah.

// Write a regex that matches lines of text that contain at least 3, but no more than 6, consecutive comma separated numbers. You may assume that every number on each line is both preceded by and followed by a comma. Test your regex against these strings:

// Copy Code
// ,123,456,789,123,345,
// ,123,456,,789,123,
// ,23,56,7,
// ,13,45,78,23,45,34,
// ,13,45,78,23,45,34,56,
// There should be three matches.

// Solution
// Copy Code
// /^,(\d+,){3,6}$/
// Your solution should match the first, third, and fourth lines.

// Write a regex that matches lines of text that contain at least 3, but no more than 6, consecutive comma separated numbers. In this exercise, you can assume that the first number on each line is not preceded by a comma, and the last number is not followed by a comma. Test your regex against these strings:

// Copy Code
// 123,456,789,123,345
// 123,456,,789,123
// 23,56,7
// 13,45,78,23,45,34
// 13,45,78,23,45,34,56
// There should be three matches.

// Solution
// Copy Code
// /^(\d+,){2,5}\d+$/
// Your solution should match the first, third, and fourth lines. In this case, the lack of a comma at each end of the strings complicates our solution slightly - we can't check for 3-6 occurrences of \d+,, but have to check for 2-5 occurrences followed by a final \d+ pattern.

// Challenge: Write a regex that matches lines of text that contain either 3 comma separated numbers or 6 or more comma separated numbers. Test your regex against these strings:

// Copy Code
// 123,456,789,123,345
// 123,456,,789,123
// 23,56,7
// 13,45,78,23,45,34
// 13,45,78,23,45,34,56
// There should be three matches.

// Solution
// Copy Code
// /(^(\d+,){2}\d+$|^(\d+,){5,}\d+$)/
// Alternate Solution

// Copy Code
// /^(\d+,){2}((\d+,){3,})?\d+$/
// Your solution should match the last three lines. Regex provide no simple way to say something like three occurrences, or 6 or more occurrences. We have two approaches we can take instead: either use alternation or use the ? quantifier to make part of the pattern optional.

// Our first solution uses alternation. Let's break it up a bit using "extended" syntax:

// Copy Code
// /
//   (                  # Grouping for alternation
//     ^(\d+,){2}\d+$   # Match precisely 3 numbers on a line
//     |                # *or*
//     ^(\d+,){5,}\d+$  # Match 6 or more numbers on a line
//   )                  # All done
// /x
// Our alternate solution uses the ? quantifier instead. Breaking it down once again, we see:

// Copy Code
// /
//   ^                  # Start of line
//   (\d+,){2}          # 2 numbers at start
//   (                  # followed by...
//     (\d+,){3,}       #    at least 3 more numbers
//   )?                 #    that are optional
//   \d+                # followed by one last number
//   $                  # end of line
// /x
// Note the use of the 'x' option on these broken out patterns. This Ruby-specific option is useful when you have a convoluted regex. It lets you write a regex over several lines, and put comments on each line. See the Ruby Regexp documentation for more information.

// In a real program, you may instead choose to use two separate regex:

// Copy Code
// if text.match(/^(\d+,){2}\d+$/) || text.match(/^(\d+,){5,}\d+$/)
// This code is easier to understand, but not always practical.

// Challenge: Write a regex that matches HTML h1 header tags, e.g.,

// Copy Code
// <h1>Main Heading</h1>
// <h1>Another Main Heading</h1>
// and the content between the opening and closing tags. If multiple header tags appear on one line, your regex should match the opening and closing tags and the text content of the headers, but nothing else. You may assume that there are no nested tags in the text between <h1> and </h1>.

// Solution
// Copy Code
// /<h1>.*?<\/h1>/
// For this exercise, we need to use a "lazy" quantifier instead of the default greedy quantifier, so we use .*? to match the text in between the <h1> opening tag and its closing tag, </h1>.

// What would happen if you omitted the '?'? Try both the correct regex and the one with a greedy quantifier (/<h1>.*<\/h1>/) against this HTML to see:

// Copy Code
// <h1>ABC</h1> <p>Paragraph</p> <h1>DEF</h1><p>Done</p>