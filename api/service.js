const config = require("../database/config.json");
const path = require("path");
const { MongoClient } = require("mongodb");
const fs = require('fs');
var ObjectId = require('mongodb').ObjectId

const client = new MongoClient("mongodb://localhost:27017");

var service = {
    setup: async (data) => {
        return new Promise(async (resolve, reject) => {
            data.balance = 0
            data.updateAt = new Date()
            await client.connect();
            const database = client.db("wallet_sample");
            const collection = database.collection("wallet");
            const result = await collection.insertOne(data);
            return resolve(result)
        })
    },
    transact: async (data, id) => {
        return new Promise(async (resolve, reject) => {
            try{
                await client.connect();
                const database = client.db("wallet_sample");
                const collection = database.collection("wallet");
                const res = collection.updateOne({_id: new ObjectId(id)}, {$set: data}, {upsert:true})
                return resolve(res)
            }
            catch(e){
                return reject(e)
            }
        });
    },
    wallet: async (id) => {
        return new Promise(async (resolve, reject) => {
            try{
                await client.connect();
                const database = client.db("wallet_sample");
                const collection = database.collection("wallet");
                const finalResult = collection.find({_id: ObjectId(id)})
                let items = [];
                await finalResult.forEach(function(doc){
                    items.push(doc);
                });
                return resolve(JSON.stringify(items))
            }
            catch(e){
                reject(e)
            }
        })
    },
    transactions: async () => {
        return new Promise(async (resolve, reject) => {
            try{
                await client.connect();
                const database = client.db("wallet_sample");
                const collection = database.collection("wallet");
                const finalResult = collection.find({}, {})
                let items = [];
                await finalResult.forEach(function(doc){
                    items.push(doc);
                });
                return resolve(JSON.stringify(items))
            }
            catch(e){
                reject(e)
            }
        })
    }
}

module.exports = service;