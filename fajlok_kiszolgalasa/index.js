const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv').config();
const path=require('path');

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/files',express.static(path.join(__dirname,'files')));


app.listen(8000,()=>console.log("Fut a szerver"));

app.get('/',(req,res)=>{
    console.log(__dirname);
    console.log(process.env.CONNECTION);
    res.send("Fájlok kiszolgálása");
});