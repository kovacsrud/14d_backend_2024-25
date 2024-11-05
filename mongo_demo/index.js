const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const Ember=require('./model/Ember');
const dotenv=require('dotenv').config();


const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

mongoose.connect(process.env.MONGO_CONNECT).then(()=>console.log("Connected")).catch(err=>console.log(err));


app.listen(8000,()=>console.log("Fut a szerver"));


app.get('/',(req,res)=>{
    res.send("Mongo demo");
});

app.get('/ember/:nev',async (req,res)=>{
    const nev=req.params.nev;
    const ember=await Ember.findOne({nev:nev});
    if(!ember){
        return res.status(404).json({message:"Nincs ilyen ember!"});
    }

    return res.status(200).json(ember);
});

app.post('/ember',async (req,res)=>{
    const {nev,email,kor}=req.body;

    const e_mail=await Ember.findOne({email:email});
    if(e_mail){
        return req.status(400).json({message:"Ez az email foglalt!"});
    }

    if(!nev || !email || !kor){
        return req.status(400).json({message:"Hiányos adatok!"});
    }

    const ujEmber=await Ember.create({
        nev:nev,
        email:email,
        kor:kor
    });

    return res.json(ujEmber);
})