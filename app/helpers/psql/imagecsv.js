const fs = require('fs');

const {
  generateImage,
} = require('../seedingHelperFunctions');

function makeImages(writer, callback) {
  let i = 1;
  write();
  function write() {
    let ok = true;
    do {
      const values = `${generateImage()},${i}\n${generateImage()},${i}\n`;
      i += 1;
      if (i === 10000000) {
        writer.write(values, () => callback('success'));
      } else {
        ok = writer.write(values);
      }
    } while (i <= 10000000 && ok);
    if (i <= 10000000) {
      writer.once('drain', write);
    }
  }
}

const writer = fs.createWriteStream('../images.csv');

makeImages(writer, string => console.log(string));
