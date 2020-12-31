// Write a regex that matches the word The when it occurs at the beginning of a line. Test it with these strings:

// Copy Code
// The lazy cat sleeps.
// The number 623 is not a word.
// Then, we went to the movies.
// Ah. The bus has arrived.
// There should be two matches.

// Solution
// Copy Code
// /^The\b/
// This regex should match the word The in the first two lines, but should not match anything on the last two.

// If you tried using /\AThe\b/ on Rubular, the match probably didn't work right. Why not? If you haven't already tried, try it now. In most cases, you should use \A instead of ^ in Ruby, but Rubular treats the test string as a single multi-line string, so you need to use ^ instead.

// Write a regex that matches the word cat when it occurs at the end of a line. Test it with these strings:

// Copy Code
// The lazy cat sleeps
// The number 623 is not a cat
// The Alaskan drives a snowcat
// There should be one match.

// Solution
// Copy Code
// /\bcat$/
// This regex should match the word cat in the second line, but should not match anything else.

// If you tried using /\bcat\z/ on Rubular, the match probably didn't work right. Why not? If you haven't already tried, try it now. In most cases, you should use \z instead of $ in Ruby, but Rubular treats the test string as a single multi-line string, so you need to use $ instead.

// Write a regex that matches any three-letter word; a word is any string comprised entirely of letters. You can use these test strings.

// Copy Code
// reds and blues
// The lazy cat sleeps.
// The number 623 is not a word. Or is it?
// There should be five matches.

// Solution
// Copy Code
// /\b[a-z][a-z][a-z]\b/i
// As expected, this regex matches and, cat, The (both occurrences), and not. Notice that it does not match 623 or it?.

// Challenge: Write a regex that matches an entire line of text that consists of exactly 3 words as follows:

// The first word is A or The.
// There is a single space between the first and second words.
// The second word is any 4-letter word.
// There is a single space between the second and third words.
// The third word -- the last word -- is either dog or cat.
// Test your solution with these strings:

// Copy Code
// A grey cat
// The lazy dog
// The white cat
// A loud dog
// Go away dog
// The ugly rat
// The lazy, loud dog
// There should be three matches.

// Solution
// Copy Code
// /^(A|The) [a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z] (dog|cat)$/
// The valid matches are A grey cat, The lazy dog, and A loud dog.

// This solution employs alternation from the first chapter in this section to define the words that occur at the beginning and end of each line and includes a match for a four-letter word in the middle. We have assumed that the middle word can contain both uppercase and lowercase letters, so we have to specify [a-zA-Z] for each of the four letters. We don't use \w because the problem explicitly asked for four-letter words.

// As with the other exercises, a proper Ruby solution would use \A and \z instead of ^ and $, but to allow for Rubular limitations, we use ^ and $ instead.