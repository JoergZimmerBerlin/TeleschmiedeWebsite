const sharp = require('sharp');
const fs = require('fs');

const inputFile = process.argv[2];
const outputFile = process.argv[3];

sharp(inputFile)
  .webp({ quality: 80 })
  .toFile(outputFile)
  .then(() => {
    console.log(`Converted ${inputFile} to ${outputFile}`);
  })
  .catch(err => {
    console.error(`Error converting ${inputFile}:`, err);
    process.exit(1);
  });
