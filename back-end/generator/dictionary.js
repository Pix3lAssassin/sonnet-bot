var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');

var dictionary = {};
var lineStarts = [];
var reverseDictionary = {};
var lineEnds = [];

exports.sonnetsDir = path.join(__dirname, '../data/sonnets.txt');

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
    for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      var words = lines[lineIndex].split(' ');
      lineStarts.push([words[0], words[1]]);
      for (var tupleStart = 0; tupleStart < words.length - 2; tupleStart++) {
        var tuple = `${words[tupleStart].toLowerCase()} ${words[tupleStart + 1].toLowerCase()}`;
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
    for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      var words = lines[lineIndex].split(' ');
      lineEnds.push([words[words.length - 1], words[words.length - 2]]);
      for (var tupleStart = words.length - 1; tupleStart < 2; tupleStart--) {
        var tuple = `${words[tupleStart].toLowerCase()} ${words[tupleStart - 1].toLowerCase()}`;
        if (reverseDictionary[tuple]) {
          reverseDictionary[tuple].push(words[tupleStart - 2]);
        } else {
          reverseDictionary[tuple] = [words[tupleStart - 2]];
        }
      }
    }
  });
};

exports.getRandomLineStart = () => {
  return lineStarts[Math.floor(lineStarts.length * Math.random())];
};

exports.getRandomLineEnd = () => {
  return lineEnds[Math.floor(lineEnds.length * Math.random())];
};

exports.getRandomNextWord = (tuple) => {
  if (dictionary[tuple]) {
    return dictionary[tuple][Math.floor(dictionary[tuple].length * Math.random())];
  } else {
    return null;
  }
};

exports.getRandomLastWord = (tuple) => {
  if (reverseDictionary[tuple]) {
    return reverseDictionary[tuple][Math.floor(dictionary[tuple].length * Math.random())];
  } else {
    return null;
  }
};

exports.initialize = () => {
  createDictionary();
  createReverseDictionary();
};