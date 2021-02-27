
### This repository is just for testing perpose



---

# node-js-sample

A image storage Node.js app using [Express 4](http://expressjs.com/).

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
git clone https://github.com/amitranawits/imageConverter.git # or clone your own fork
cd imageConverter
npm install
npm start
```

Your app should now be running on [localhost:3000](http://localhost:3000/).


## Running test cases

Sample file is in testImage folder
npm test will pick the image from testImage folder, add new key with image name and place it to Images folder with new extenstion giver in params.

```sh
npm test
```

## Documentation

Two api's are there

- GET image
/image/id=123.jpeg
id will be given while saving image api.

- POST image

files = multiple files