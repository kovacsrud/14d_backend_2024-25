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
});

app.patch('/termek',(req,res)=>{
    let adat=req.body;
    let modositando=adatok.findIndex(x=>x.id==adat.id);
    if(modositando>-1){
        adatok[modositando]=adat;
        res.status(200).json({message:"Adat módosítva!"});
    } else {
        res.status(404).json({message:"Az adat nem található!"});
    }
});

app.delete('/termek/:id',(req,res)=>{
    let id=req.params.id;
    adatok=adatok.filter(x=>x.id!=id);
    res.status(200).json({message:"A termék törölve!"});
});

app.get('/marka/:marka',(req,res)=>{
    const {marka}=req.params;
    let result=adatok.filter(x=>x.marka.toLowerCase()==marka.toLowerCase());
    if(result.length>0){
        res.status(200).json(result);
    } else {
        res.status(404).json({message:"Nincs ilyen márka!"})
    }

});

app.get('/termeknev/:termeknev',(req,res)=>{
    const {termeknev}=req.params;
    let result=adatok.filter(x=>x.termeknev.toLowerCase()==termeknev.toLowerCase());

    if(result.length>0){
        return res.status(200).json(result);
    }

    res.status(404).json({message:"Nincs ilyen nevű termék!"});


});