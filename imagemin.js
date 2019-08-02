const imagemin = require('imagemin');
const PNGImages = 'photos/*.png';
const JPEGImages = 'photos/*.jpg';
const output = 'build/photos';

// for jpeg images
const imageminMozjpeg = require('imagemin-mozjpeg');

const optimiseJPEGImages = () =>
  imagemin([JPEGImages], output, {
    plugins: [
      imageminMozjpeg({
        quality: 70,
      }),
    ]
  });

optimiseJPEGImages()
  .catch(error => console.log(error));


// for png images 
const imageminPngquant = require('imagemin-pngquant');

const optimisePNGImages = () =>
  imagemin([PNGImages], output, {
    plugins: [
      imageminPngquant({ quality: [0.65, 0.80]})
    ],
  });

optimiseJPEGImages()
  .then(() => optimisePNGImages())
  .catch(error => console.log(error));


// for webp images
const imageminWebp = require('imagemin-webp');

const convertPNGToWebp = () =>
  imagemin([PNGImages], output, {
    use: [
      imageminWebp({
        quality: 85,
      }),
    ]
  });

const convertJPGToWebp = () =>
  imagemin([JPEGImages], output, {
    use: [
      imageminWebp({
        quality: 75,
      }),
    ]
  });

optimiseJPEGImages()
  .then(() => optimisePNGImages())
  .then(() => convertPNGToWebp())
  .then(() => convertJPGToWebp())
  .catch(error => console.log(error));
