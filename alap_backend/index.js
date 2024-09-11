const express=require('express');
const cors=require('cors');

const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

let adatok=[
    {
        id:1,
        termeknev:"nyomtató",
        marka:"Canon"
    },
    {
        id:2,
        termeknev:"egér",
        marka:"Logitech"
    },
    {
        id:3,
        termeknev:"router",
        marka:"Tplink"
    },
    {
        id:4,
        termeknev:"nyomtató",
        marka:"Xerox"
    }

]


app.listen(8000,()=>{console.log("Fut a szerver")});

app.get('/',(req,res)=>{
    res.send("Alap backend");
});

app.get('/udvozlet',(req,res)=>{
    res.json({message:"Üdvözli az alap backend!!!"});
});

app.get('/termekek',(req,res)=>{
    res.status(200).json(adatok);
});

app.post('/termek',(req,res)=>{
    //Az érkező adatokat ki kell olvasni
    console.log(req.body);

    adatok.push(req.body);

    res.status(201).json({message:"Adat beillesztve!"})
})
