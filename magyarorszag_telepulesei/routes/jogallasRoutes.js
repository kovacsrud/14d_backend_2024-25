const express=require('express');
const router=express.Router();

const {jogallaslista}=require('../controllers/jogallasController');

router.get('/',jogallaslista);

module.exports=router;