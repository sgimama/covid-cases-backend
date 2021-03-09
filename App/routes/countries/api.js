const express = require('express');
const router = express.Router();
const http = require("./http");
const User = require('../../database/models/user.model');
const axios = require("axios");


router.get('/single/:data', async (req,res) =>{
    const result = await http.get(`name/${req.params.data}?fullText=true`);
    res.json(result.data[0].name);
})

router.get('/list/:data', async(req,res) =>{
    const data = req.params.data.split(',');
    let result = {};
    for(item of data){
        const get = await http.get(`name/${item}`);
        result = {
            ...result,
            [item] : get.data.map(match => {
                return match.name;
            })
        }
    }
    res.json(result);
})

router.get('/all', async(req,res) =>{
    const result = await http.get('all');
    const countries = result.data.map(countrie => {
        return countrie.name;
    })
    res.json(countries);
})

router.post('/', (req,res) =>{
   
})
 
 router.put('/:id', async (req,res) =>{

 }); 

module.exports = router;