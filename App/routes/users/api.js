const express = require('express');
const router = express.Router();
const User = require('../../database/models/user.model');



router.get('/', (req,res) =>{
    User.findAll({
        include: 'wallet'
    }).then(users => res.json(users));
})

router.post('/', (req,res) =>{
   
})
 
 router.put('/:id', async (req,res) =>{

 }); 

module.exports = router;