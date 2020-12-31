// Write a regex that matches any sequence of three characters delimited by whitespace characters. Test it with these strings:

// Copy Code
// reds and blues
// the lazy cat sleeps
// There should be three matches.

// Solution
// Copy Code
// /\s...\s/
// As expected, this regex matches and and cat, together with the spaces to either side of those words. What might be more surprising is that the also matches on Rubular; here, the newline between the first and second lines of text is a whitespace character.

// Test the pattern /\s...\s/ from the previous exercise against this text (be sure to delete the previous text first):

// Copy Code
// Doc in a big red box.
// Hup! 2 3 4
// Observe that one of the three-letter words in this text match the pattern; it also matches 2 3. Why is it that this pattern doesn't include the three-letter words Doc, red, box, or Hup, but it does match 2 3?

// Solution
// Note that in all of these cases, the "match" is five characters long:

// Doc doesn't match since Doc doesn't follow any whitespace.
// big matches since it is three characters with both leading and trailing whitespace.
// red doesn't match since the regex engine consumes the space character that precedes red when it matches big (note the trailing space). Once consumed as part of a match, the character is no longer available for subsequent matches.
// box doesn't match since a period follows it.
// Hup doesn't match since an exclamation point follows it.
// 2 3 matches since 2 3 is three characters long and it has both leading and trailing whitespace.


// Write a regex that matches any four digit hexadecimal number that is both preceded and followed by whitespace. Note that 0x1234 is not a hexadecimal number in this exercise: there is no space before the number 1234.

// Copy Code
// Hello 4567 bye CDEF - cdef
// 0x1234 0x5678 0xABCD
// 1F8A done
// There should be four matches (2 on Scriptular)

// Solution
// Ruby

// Copy Code
// /\s\h\h\h\h\s/
// JavaScript

// Copy Code
// /\s[\dA-F][\dA-F][\dA-F][\dA-F]\s/ig
// The real surprise here may be that cdef and 1F8A are matches. If you followed the previous exercise, though, it shouldn't come as a surprise; cdef has a trailing white space character in the form of a newline, and 1F8A has a preceding white space that is a newline.

// Note that the JavaScript solution cannot use \h, but needs to use [\dA-F] instead, or, equivalently, [0-9A-F].

// The matches are 4567, CDEF, cdef, and 1FBA. On Scriptular, those last two numbers fail to match.

// Write a regex that matches any sequence of three letters. Test it with these strings:

// Copy Code
// The red d0g chases the b1ack cat.
// a_b c_d
// There should be seven matches.

// Solution
// Copy Code
// /[a-z][a-z][a-z]/i
// This question was tricky in that it doesn't use any character class shortcuts; recall that there isn't one for letters. Note that /\w/ matches digits and underscores as well.

// If you entered something different, check your work: Rubular should highlight The, red, cha, ses, the, ack, and cat if your regex is correct. Note in particular that neither d0g (dee-zero-gee) nor b1a (bee-one-ay) light up, nor do either of the underscored values.