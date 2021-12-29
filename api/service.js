const config = require("../database/config.json");
const path = require("path");
const fs = require('fs');

var service = {
    setup: async (data) => {
        return new Promise((resolve, reject) => {
            data.id = Math.floor(1000 + Math.random() * 9000);
            data.balance = 0
            data.updateAt = new Date()
            fs.readFile(path.join(__dirname,'../database/config.json'), (err, fileData) => {
                if (err) {
                    return reject(err)
                }
                const object = JSON.parse(fileData);
                object.push(data)
                const jsonString = JSON.stringify(object)
            fs.writeFile(path.join(__dirname,'../database/config.json'), jsonString, err => {
                if (err) {
                    return reject(err)
                } else {
                    return resolve(data)
                }
            })
        })
    })
    },
    transact: async (data, id) => {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname,'../database/config.json'), (err, fileData) => {
                if (err) {
                    return reject(err)
                }
                  const object = JSON.parse(fileData);
                  for(let i = 0; i < object.length; i++){
                      if(object[i].id == id){
                        data.balance = data.balance + object[i].balance
                        data.walletId = object[i].walletId
                        data.id = object[i].id
                      }
                  }
                  if(!data.walletId){
                    return resolve("No match found")
                  }
                  data.updateAt = new Date()
                  data.updatedAt = Math.floor(1000 + Math.random() * 9000);
                  object.push(data)
                const jsonString = JSON.stringify(object)
                fs.writeFile(path.join(__dirname,'../database/config.json'), jsonString, err => {
                    if (err) {
                        return reject(err)
                    } else {
                        return resolve(data)
                    }
                })
        })
    });
    },
    wallet: async (id) => {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname,'../database/config.json'), (err, fileData) => {
                if (err) {
                    return reject(err)
                }
                let finalObj = []
                const object = JSON.parse(fileData);
                for(let i = 0; i < object.length; i++){
                    if(object[i].walletId == id){
                    finalObj.push(object[i])
                    }
                }
                return resolve(finalObj)
            })
        })
    },
    transactions: async () => {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname,'../database/config.json'), (err, fileData) => {
                if (err) {
                    return reject(err)
                }
                else{
                    return resolve(JSON.parse(fileData))
                }
            })
        })
    }
}

module.exports = service;