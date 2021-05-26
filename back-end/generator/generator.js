var dictionary = require('./dictionary');
var pronouncing = require('pronouncing');
var SpellChecker = require('simple-spellchecker');
var thesaurus = require('thesaurus');

dictionary.initialize();

var spellchecker = null;
SpellChecker.getDictionary('en-US', function (err, dict) {
  if (err) { return console.log(err); }
  spellchecker = dict;
});

var sfc32 = (a, b, c, d) => {
  return function () {
    a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
    var t = (a + b) | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = (c << 21 | c >>> 11);
    d = d + 1 | 0;
    t = t + d | 0;
    c = c + t | 0;
    return (t >>> 0) / 4294967296;
  };
};

var xmur3 = (str) => {
  for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = h << 13 | h >>> 19;
  }
  return function () {
    h = Math.imul(h ^ h >>> 16, 2246822507);
    h = Math.imul(h ^ h >>> 13, 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
};

var generateLine = (rand) => {
  var startingWords = dictionary.getRandomLineStart(rand());
  var line = [];
  var syllables = 0;
  for (var i = -2; syllables < 10; i++) {
    var nextWord;
    if (i < 0) {
      nextWord = startingWords[i + 2];
    } else {
      var word1 = dictionary.cleanStr(line[i].toLowerCase());
      var word2 = dictionary.cleanStr(line[i + 1].toLowerCase());
      nextWord = dictionary.getRandomNextWord(word1 + ' ' + word2, rand());
    }
    if (nextWord != null) {
      var cleanWord = dictionary.cleanStr(nextWord.toLowerCase());

      var phone = pronouncing.phonesForWord(cleanWord)[0];
      console.log('Word: ' + cleanWord + ', Phone: ' + phone);
      var cleanWordSyllables = pronouncing.syllableCount(phone);

      if (syllables + cleanWordSyllables > 10 && spellchecker !== null) {
        var word;
        if (!spellchecker.spellCheck(cleanWord)) {
          word = spellchecker.getSuggestions(cleanWord, 1);

          if (word.length > 0) {
            word = word[0];
          }
        }
        var possibleWords = [];
        possibleWords = thesaurus.find(word);

        if (possibleWords.length > 0) {
          for (var wordIndex = 0; wordIndex < possibleWords.length; wordIndex++) {
            phone = pronouncing.phonesForWord(possibleWords[wordIndex])[0];
            var possibleWordSyllables = pronouncing.syllableCount(phone);
            if (syllables + possibleWordSyllables === 10) {
              syllables += cleanWordSyllables;
              line.push(nextWord);
              break;
            }
          }
        }
        if (syllables < 10) {
          syllables += cleanWordSyllables;
          line.push(nextWord);
        }
      } else {
        syllables += cleanWordSyllables;
        line.push(nextWord);
      }
    } else {
      syllables += 1;
    }
  }
  console.log(syllables);
  return line.join(' ');
};

var reverseArray = (arr) => {
  var output = [];
  for (var i = 0; i < arr.length; i++) {
    output[i] = arr[arr.length - 1 - i];
  }
  return output;
};

var rhymingWordIndex = -1;

var generateReverseLine = (rand) => {
  var startingWords;
  if (rhymingWordIndex < 0) {
    startingWords = dictionary.getRandomLineEnd(rand(), rand());
    var rhymingWord = dictionary.cleanStr(startingWords[0]).toLowerCase();
    var list = pronouncing.rhymes(rhymingWord);
    var rhymingIndex = -1;
    for (var i = 0; i < list.length; i++) {
      var tempIndex = dictionary.findLineEnding(list[i]);
      if (tempIndex > -1) {
        rhymingIndex = tempIndex;
        break;
      }
    }
    if (rhymingIndex > -1) {
      rhymingWordIndex = rhymingIndex;
    } else {
      rhymingWordIndex = Math.floor(2000 * rand());
    }
  } else {
    startingWords = dictionary.getLineEnding(rhymingWordIndex);
    rhymingWordIndex = -1;
  }
  var line = [];
  var syllables = 0;
  for (var i = -2; syllables < 10; i++) {
    var nextWord;
    if (i < 0) {
      nextWord = startingWords[i + 2];
    } else {
      var word1 = dictionary.cleanStr(line[i].toLowerCase());
      var word2 = dictionary.cleanStr(line[i + 1].toLowerCase());
      nextWord = dictionary.getRandomLastWord(word1 + ' ' + word2, rand());
    }
    if (nextWord != null) {
      var cleanWord = dictionary.cleanStr(nextWord.toLowerCase());

      var phone = pronouncing.phonesForWord(cleanWord)[0];
      console.log('Word: ' + cleanWord + ', Phone: ' + phone);
      var cleanWordSyllables = pronouncing.syllableCount(phone);

      if (syllables + cleanWordSyllables > 10 && spellchecker !== null) {
        var word = cleanWord;
        if (!spellchecker.spellCheck(cleanWord)) {
          suggestions = spellchecker.getSuggestions(cleanWord, 1);

          if (suggestions.length > 0) {
            word = suggestions[0];
          }
        }
        var possibleWords = [];
        possibleWords = thesaurus.find(word);

        if (possibleWords.length > 0) {
          for (var wordIndex = 0; wordIndex < possibleWords.length; wordIndex++) {
            phone = pronouncing.phonesForWord(possibleWords[wordIndex])[0];
            var possibleWordSyllables = pronouncing.syllableCount(phone);
            if (syllables + possibleWordSyllables === 10) {
              syllables += cleanWordSyllables;
              line.push(nextWord);
              break;
            }
          }
        }
        if (syllables < 10) {
          syllables += cleanWordSyllables;
          line.push(nextWord);
        }
      } else {
        syllables += cleanWordSyllables;
        line.push(nextWord);
      }
    } else {
      syllables += 1;
    }
  }
  console.log(syllables);
  line = reverseArray(line);
  line[0] = line[0].charAt(0).toUpperCase() + line[0].slice(1);
  return line.join(' ');
};

exports.generateSonnet = (seed = null) => {
  if (seed === null) {
    seed = Math.random().toString(16).slice(2);
  }
  var seedFn = xmur3(seed);
  var rand = sfc32(seedFn(), seedFn(), seedFn(), seedFn());

  var sonnet = [];
  for (var i = 0; i < 12; i++) {
    var line;
    if (i % 2) {
      line = generateReverseLine(rand);
    } else {
      line = generateLine(rand);
    }
    sonnet.push(line);
  }
  sonnet = sonnet.join('\n');

  return { seed, sonnet };
};