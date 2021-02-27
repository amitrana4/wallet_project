
const Jimp = require('jimp');
const path = require("path");
const fs = require('fs');

// We can change size 
const convertFileExt = async (url, id, ext) => {
    return new Promise((resolve, reject) => {
        Jimp.read(url)
        .then(lenna => {
            return resolve(lenna
            .resize(256, 256) // resize
            .quality(60) // set JPEG quality
            .greyscale() // set greyscale
            .write(path.join(__dirname,`../images/${id}.${ext}`))); // save
        })
        .catch(err => {
            reject(err);
        });
    }) 
}
const getFileFromFolder = (id) => {
  const files = fs.readdirSync(path.join(__dirname,`../images`));
  const filename = files.find((file) => {
    return file.includes(id);
  });
  return filename;
}

var imageConverter = {
    convertFile: async function(req) {
        return new Promise(async (resolve, reject) => {
            try {
                let fileData = req.params.file.split('.');
                const file = await getFileFromFolder(fileData[0]);
                if(file){
                    await convertFileExt(path.join(__dirname, `../images/${file}`), fileData[0], fileData[1]);
                    return resolve({status: 'success', 'message': `../images/${fileData[0]}.${fileData[1]}`});
                }
                else {
                    return resolve({status: 'err', 'message': 'No file found!'});
                }
            }
            catch(err) {
                return reject(err)
            }
        });
    }
};

module.exports = imageConverter;