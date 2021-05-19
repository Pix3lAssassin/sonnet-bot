var dictionary = require('./dictionary');

var sfc32 = (a, b, c, d) => {
  return function() {
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
  return function() {
    h = Math.imul(h ^ h >>> 16, 2246822507);
    h = Math.imul(h ^ h >>> 13, 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
};

exports.generateSonnet = (seed = null) => {
  if (seed === null) {
    seed = Math.random().toString(16).slice(2);
  }
  var seedFn = xmur3(seed);
  var rand = sfc32(seed(), seed(), seed(), seed());

  var line = '';
  for (var i = 0; i < 5; i++) {
    line += ' ' + dictionary.getRandomNextWord();
  }

  return { seed, sonnet: line };
};
