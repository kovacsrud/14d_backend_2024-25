const express=require('express');
const router=express.Router();

const {megyelista,megyetelepulesei}=require('../controllers/megyeController');

router.get('/',megyelista);
router.get('/megye/:megye',megyetelepulesei);

module.exports=router;