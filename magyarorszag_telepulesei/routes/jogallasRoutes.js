const express=require('express');
const router=express.Router();

const {jogallaslista,jogallastelepulesei}=require('../controllers/jogallasController');

router.get('/',jogallaslista);
router.get('/jogallas/:jogallas',jogallastelepulesei);

module.exports=router;