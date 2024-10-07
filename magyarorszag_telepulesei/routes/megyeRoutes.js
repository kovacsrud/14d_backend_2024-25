const express=require('express');
const router=express.Router();

const {megyelista}=require('../controllers/megyeController');

router.get('/',megyelista);

module.exports=router;