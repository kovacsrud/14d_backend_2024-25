const express=require('express');
const cors=require('cors');
const sqlite3=require('sqlite3');
const db=new sqlite3.Database('./kutyak.db');
const {kutyanevek}=require('./dbrepo.js');

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(8000,()=>{console.log("Fut a szerver")});

app.get('/',(req,res)=>{
    res.send("Kutyák adatbázis")
});

app.get('/kutyanevek',(req,res)=>{
    db.all("select * from kutyanevek",(error,rows)=>{
        if(error){
            res.json(error);
        } else {
            if(rows.length>0){
                res.status(200).json(rows);
            } else {
                res.status(404).json({message:"Nincs ilyen adat!"});
            }
        }
    }
    );
});

app.post('/kutyanevek',(req,res)=>{

    const {kutyanev}=req.body;
    db.run("insert into kutyanevek (kutyanev) values(?)",[kutyanev],error=>{
        if(error) return res.send(error);
        return res.status(201).json({message:"Adat beszúrva!"});
    });

});

app.patch('/kutyanevek',(req,res)=>{
    const {Id,kutyanev}=req.body;
    db.run("update kutyanevek set kutyanev=? where Id=?",[kutyanev,Id],error=>{
        if(error) return res.send(error);
        return res.status(200).json({message:"Adat módosítva!"});
    });

});

app.delete('/kutyanevek/:id',(req,res)=>{
    const Id=req.params.id;
    db.run("delete from kutyanevek where Id=?",[Id],error=>{
        if(error) return res.send(error);
        return res.status(200).json({message:"Adat törölve!"});
    });
})

app.get('/kutyanevek2',(req,res)=>{
    db.all("select * from kutyanevek",(error,rows)=>{
        if(error) return res.json(error);
        if(rows.length>0) return res.status(200).json(rows)

        return res.status(404).json({message:"Nincs ilyen adat!"});
    });
});

app.get('/kutyanevek3',(req,res)=>{
    kutyanevek(db).then(adat=>res.json(adat)).catch(err=>res.send(err));
});

app.get('/kutyanevek4',async (req,res)=>{
    try {
        const adatok=await kutyanevek(db);        
        res.json(adatok);
        
    } catch (error) {
        res.send(error);
    }
    
});

