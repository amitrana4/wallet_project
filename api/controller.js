'use strict';

var utils = require('../utils');
const path = require("path");
const fs = require('fs')
const stream = require('stream')


var controllers = {
    saveFile: async function(req, res) {
        utils.saveImage.uploadFile(req, res, function(err, dist) {
            if (err) {
                res.send(err);
            }
            else {
                res.status(200).send({status: 200, message: dist});
            }
        });
    },
    convertFile: async function(req, res) {
        try {
            const pathToImg = await utils.imageConverter.convertFile(req);
            if(pathToImg.status === 'err'){
                return res.send(pathToImg)
            }
            else {
                const r = fs.createReadStream(path.join(__dirname, pathToImg.message)) 
                const ps = new stream.PassThrough()
                stream.pipeline(
                r,
                ps, 
                (err) => {
                    if (err) {
                    console.log(err) 
                    return res.sendStatus(400); 
                    }
                })
                ps.pipe(res) 
            }
        }
        catch (err){
            res.send(err);
        }
    },
};

module.exports = controllers;