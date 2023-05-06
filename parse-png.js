const PNG = require('png-js');
const fs = require('fs');

const png = new PNG(fs.readFileSync('./img.png'));

const width  = png.width;
const height = png.height;
const tileWidthPixels = 51;
const tileHeightPixels = 51;

png.decode(function (pixels) {
  pixels = squashRGBA(pixels);
  pixels = to2dArrayUsingTileCenterPixels(pixels);
  console.log(JSON.stringify(pixels));
});

// Squash RGBA to single value
function squashRGBA(pixels) {
  const squashed = [];
  for (let i = 0; i < pixels.length; i+=4) {
    squashed.push(pixels[i] === 0 ? 0 : 1);
  }
  return squashed;
}

function to2dArrayUsingTileCenterPixels(pixels) {
  const result = [];

  const centerY = Math.floor(tileHeightPixels / 2);
  const centerX = Math.floor(tileWidthPixels / 2);

  for (let i = centerY; i < height; i+=tileHeightPixels) {
    const row = [];
    for (let j = centerX; j < width; j+=tileWidthPixels) {
      row.push(pixels[i * width + j]);
    }
    result.push(row);
  }

  return result;
}
