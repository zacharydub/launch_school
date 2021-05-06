//Write a program that determines the sentence with the most words in some text. Sentences may end with periods (.), exclamation points (!), or question marks (?). Sentences always begin with a word character. You should treat any sequence of characters that are not spaces or sentence-ending characters, as a word. Log the longest sentence and its word count to the console. Pay attention to the expected output. Note that this problem is about manipulating and processing strings. As such, every detail about the string matters (e.g., case, punctuation, tabs, spaces, etc.).
let longText = 'Four score and seven years ago our fathers brought forth' +
  ' on this continent a new nation, conceived in liberty, and' +
  ' dedicated to the proposition that all men are created' +
  ' equal.' +
  ' Now we are engaged in a great civil war, testing whether' +
  ' that nation, or any nation so conceived and so dedicated,' +
  ' can long endure. We are met on a great battlefield of that' +
  ' war. We have come to dedicate a portion of that field, as' +
  ' a final resting place for those who here gave their lives' +
  ' that that nation might live. It is altogether fitting and' +
  ' proper that we should do this.' +
  ' But, in a larger sense, we can not dedicate, we can not' +
  ' consecrate, we can not hallow this ground. The brave' +
  ' men, living and dead, who struggled here, have' +
  ' consecrated it, far above our poor power to add or' +
  ' detract. The world will little note, nor long remember' +
  ' what we say here, but it can never forget what they' +
  ' did here. It is for us the living, rather, to be dedicated' +
  ' here to the unfinished work which they who fought' +
  ' here have thus far so nobly advanced. It is rather for' +
  ' us to be here dedicated to the great task remaining' +
  ' before us -- that from these honored dead we take' +
  ' increased devotion to that cause for which they gave' +
  ' the last full measure of devotion -- that we here highly' +
  ' resolve that these dead shall not have died in vain' +
  ' -- that this nation, under God, shall have a new birth' +
  ' of freedom -- and that government of the people, by' +
  ' the people, for the people, shall not perish from the' +
  ' earth.';

//convert input text to array
//create newarray to hold sentence elements
//iterate thru array. If an elm ends with a period or ! or ?, that is the end of the sentence - slice up to that word+1 and push to newarray. Note starting/ending index

function longestSentence(text) {
  let arr = text.split(" ");
  let sentenceArray = [];

  let position = 0;
  arr.forEach((word, index) => {
    if (word.match(/(\.|\?|!)$/)) {
      sentenceArray.push(arr.slice(position, index + 1));
      position = index + 1;
    }
  })

  let max = -Infinity;
  let longest = 0;
  sentenceArray.forEach((sentence, index) => {
    if (sentence.length > max) {
      max = sentence.length;
      longest = index;
    }
  })

  console.log(`${sentenceArray[longest].join(" ")}`);
  console.log(`The longest sentence has ${max} words`);
}

longestSentence(longText)
