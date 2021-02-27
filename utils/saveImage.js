var multer = require('multer');
var uuid = require('uuid');
var filename = uuid.v4();
const path = require("path");

//Current folder for storing is Image
var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./images");
    },
    filename: function(req, file, callback) {
        callback(null, filename  + '.' + path.extname(file.originalname).slice(1) );
    }
});
// Limit 10
var upload = multer({
    storage: Storage
}).array("files", 10);

var saveImage = {
    uploadFile: function(req, res, next) {
        upload(req, res, function(err) {
            if (!req.files) {
                return res.send({status: 400, message: 'Please select an image to upload'});
            }
            else if (err instanceof multer.MulterError) {
                return res.send({status: 400, message: err});
            }
            else if (err) {
                return res.send({status: 400, message: err});
            }
            res.status(200).send({status: 200, message: "File uploaded sucessfully!.", imageId:filename});
           // return res.send("File uploaded sucessfully!.");
        });
    }
};

module.exports = saveImage;