const express=require('express');
const cors=require('cors');
const {tesztmw}=require('./mw/tesztmw');
const {log}=require('./mw/log');

const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(tesztmw);
app.use(log);


app.listen(8000,()=>{console.log("Fut a szerver")});


app.get('/',(req,res)=>{
    res.send("Middleware-ek");
});

app.get('/adatkeres',(req,res)=>{
    res.json({adat:123});
});

app.post('/adatkuldes',(req,res)=>{
    res.json({message:"Ok"});
});