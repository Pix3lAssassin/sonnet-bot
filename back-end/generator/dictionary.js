var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');

var dictionary = {};
var reverseDictionary = {};

exports.sonnetsDir = path.join(__dirname, '../data/sonnets.txt');

var readSonnets = () => {
  console.log(exports.sonnetsDir);
  return fs.readFileAsync(exports.sonnetsDir, 'utf8')
    .then((sonnetData) => {
      var lines = sonnetData.split('\r\n');
      return lines;
    })
    .catch(err => console.log(err));
};

var createDictionary = () => {
  readSonnets().then((lines) => {
    for (var lineIndex = 0; lineIndex < lines; i++) {
      var words = lines[lineIndex].split(' ');
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
createDictionary();

var createReverseDictionary = () => {
  readSonnets().then((lines) => {
    for (var lineIndex = 0; lineIndex < lines; i++) {
      var words = lines[lineIndex].split(' ');
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
createReverseDictionary();

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