const express=require('express');
const router=express.Router();
const {telepuleslista,telepules}=require('../controllers/telepulesController');

router.get('/',telepuleslista);
router.get('/telepulesnev/:telepulesnev',telepules);

module.exports=router;