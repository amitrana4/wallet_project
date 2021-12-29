'use strict';

const path = require("path");
const fs = require('fs')
const stream = require('stream')
const service = require('./service');


var controllers = {
    setup: async (req, res) => {
        try{
            const response = await service.setup(req.body)
            res.status(200).send({status: 200, message: 'Success', body: response});
        }
        catch(e){
            res.send(e);
        }
    },
    transact: async (req, res) => {
        try{
            const { id } = req.params;
            const response = await service.transact(req.body, id)
            res.status(200).send({status: 200, message: 'Success', body: response});
        }
        catch(e){
            res.send(e);
        }
    },
    wallet: async (req, res) => {
        try{
            const { id } = req.params;
            const response = await service.wallet(id)
            res.status(200).send({status: 200, message: 'Success', body: response});
        }
        catch(e){
            res.send(e);
        }
    },
    transactions: async (req, res) => {
        try{
            const response = await service.transactions()
            res.status(200).send({status: 200, message: 'Success', body: response});
        }
        catch(e){
            res.send(e);
        }
    },
};

module.exports = controllers;