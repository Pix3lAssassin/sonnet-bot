var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');

var dictionary = {};
var lineStarts = [];
var reverseDictionary = {};
var lineEnds = [];
var rhymingEnds = [];

exports.sonnetsDir = path.join(__dirname, '../data/sonnets.txt');

exports.cleanStr = (s) => {
  return s.replace(/[^A-Za-z0-9]/g, '').trim();
};

var readSonnets = () => {
  console.log(exports.sonnetsDir);
  return fs.readFileAsync(exports.sonnetsDir, 'utf8')
    .then((sonnetData) => {
      var lines = sonnetData.split('\n');
      return lines;
    })
    .catch(err => console.log(err));
};

var createDictionary = () => {
  readSonnets().then((lines) => {
    for (var lineIndex = 0; lineIndex < lines.length - 1; lineIndex++) {
      var words = lines[lineIndex].split(' ');
      var wordsLine2 = lines[lineIndex + 1].split(' ');
      words.push(...wordsLine2);
      lineStarts.push([words[0], words[1]]);
      for (var tupleStart = 0; tupleStart < words.length - 2; tupleStart++) {
        var tuple = exports.cleanStr(words[tupleStart].toLowerCase()) + ' ' +
          exports.cleanStr(words[tupleStart + 1].toLowerCase());

        if (dictionary[tuple]) {
          dictionary[tuple].push(words[tupleStart + 2]);
        } else {
          dictionary[tuple] = [words[tupleStart + 2]];
        }
      }
    }
  });
};

var createReverseDictionary = () => {
  readSonnets().then((lines) => {
    for (var lineIndex = lines.length - 2; lineIndex > 1; lineIndex--) {
      var words = lines[lineIndex - 1].split(' ');
      var wordsLine2 = lines[lineIndex].split(' ');
      words.push(...wordsLine2);
      lineEnds.push([words[words.length - 1], words[words.length - 2]]);
      for (var tupleStart = words.length - 1; tupleStart > 1; tupleStart--) {
        var tuple = exports.cleanStr(words[tupleStart].toLowerCase()) + ' ' +
          exports.cleanStr(words[tupleStart - 1].toLowerCase());

        if (reverseDictionary[tuple]) {
          reverseDictionary[tuple].push(words[tupleStart - 2]);
        } else {
          reverseDictionary[tuple] = [words[tupleStart - 2]];
        }
      }
    }
  });
};

exports.findLineEnding = (word) => {
  for (var endIndex = 0; endIndex < lineEnds; endIndex++) {
    if (word === exports.cleanStr(lineEnds[endIndex][0])) {
      return endIndex;
    }
  }
  return -1;
};

exports.getLineEnding = (index) => {
  return lineEnds[index];
};

exports.getRandomLineStart = (randFloat) => {
  return lineStarts[Math.floor(lineStarts.length * randFloat)];
};

exports.getRandomLineEnd = (randFloat, randFloat2) => {
  var sonnet = Math.floor(lineEnds.length / 14 * randFloat) * 14;
  var lines = [1, 3, 5, 7, 9, 11, 12, 13];
  return lineEnds[sonnet + lines[Math.floor(lines.length * randFloat2)]];
};

exports.getRandomNextWord = (tuple, randFloat) => {
  if (dictionary[tuple]) {
    return dictionary[tuple][Math.floor(dictionary[tuple].length * randFloat)];
  } else {
    return null;
  }
};

exports.getRandomLastWord = (tuple, randFloat) => {
  if (reverseDictionary[tuple]) {
    return reverseDictionary[tuple][Math.floor(reverseDictionary[tuple].length * randFloat)];
  } else {
    return null;
  }
};

exports.initialize = () => {
  createDictionary();
  createReverseDictionary();
};