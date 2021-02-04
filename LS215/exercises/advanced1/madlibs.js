//Let's build another program using madlibs. We made a similar program in the Easy exercises, but this time the requirements are a bit different.
//
//Build a madlibs program that takes a text template as input, plugs in a selection of randomized nouns, verbs, adjectives, and adverbs into that text, and then returns it. You can build your lists of nouns, verbs, adjectives, and adverbs directly into your program. Your program should read this text and, for each line, place random words of the appropriate types into the text and return the result.
//
//The challenge of this program isn't just about writing your solution—it's about choosing the structure of the text template. Choose the right way to structure your template and this problem becomes much easier. Consequently, this exercise is a bit more open-ended since the input is also something that you'll be defining.
//
//Examples:
//
//Note: The quotes in the example strings returned by the madlibs function are only shown for emphasis. These quotes are not present in the actual output strings. The words in quotes come from the list of texts and it is the madlibs function that puts them in.

// These examples use the following list of replacement texts:
//adjectives: quick lazy sleepy noisy hungry
//nouns: fox dog head leg tail cat
//verbs: jumps lifts bites licks pats
//adverbs: easily lazily noisily excitedly
//------

const template1 = 'The ${adjective} brown ${noun} ${adverb} ' +
  '${verb} the ${adjective} yellow ' +
  '${noun}, who ${adverb} ${verb} his ' +
  '${noun} and looks around.';

let template2 = "The ${noun} ${verb} the ${noun}'s ${noun}.";
const REPLACEMENT_TEXTS = {
  adjective: ['quick', 'lazy', 'sleepy', 'noisy', 'hungry'],
  noun: ['fox', 'dog', 'head', 'leg', 'tail'],
  verb: ['jumps', 'lifts', 'bites', 'licks', 'pats'],
  adverb: ['easily', 'lazily', 'noisily', 'excitedly'],
};
function replaceText(match) {
  const key = match.replace(/[^a-z]/g, '');
  const index = Math.floor(Math.random() * REPLACEMENT_TEXTS[key].length);
  return REPLACEMENT_TEXTS[key][index];
}

function madlibs(template) {
  console.log(template.replace(/\${[a-z]+}/g, replaceText));
}

madlibs(template1);
// The "hungry" brown "cat" "lazily"
// "licks" the "noisy" yellow
// "dog", who "lazily" "licks" his
// "leg" and looks around.

madlibs(template2);      // The "fox" "bites" the "dog"'s "tail".

madlibs(template2);      // The "cat" "pats" the "cat"'s "head".
//The solution processes the template by calling the String.prototype.replace method and passing in a regex and a callback function as arguments. The regex pattern, /\${[a-z]+}/g, matches each token in the template. The text matched by the regex pattern is then passed as an argument to the replaceText callback function. The replaceText function processes the matched text to remove any characters used as identifiers (in this case, ${}), leaving only the content type. The content type is then used as the key to retrieve the appropriate list of words from the REPLACEMENT_TEXTS object. The replaceText function generates a random index and uses it to select a word from the list at random.
madlibs(template1);
// The "sleepy" brown "cat" "noisily"
// "licks" the "sleepy" yellow
// "dog", who "lazily" "licks" his
// "tail" and looks around.
