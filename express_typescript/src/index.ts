import express, {Request,Response} from 'express';
const cors=require('cors');
import { Szemely } from './model/szemely';
import { Kutyanev } from './model/kutyanev';
import  sqlite3  from 'sqlite3';
const db=new sqlite3.Database('./kutyak.db');


const app=express();
app.use(express.json());
app.use(cors());

app.listen(8000,()=>{console.log("Fut a szerver")});

let szemelyek:Szemely[]=[];

let szemely:Szemely={
    id:1,
    vnev:"Zsuzsa",
    knev:"Ilona",
    kor:31
}

szemelyek.push(szemely);

app.get('/',(req:Request,res:Response)=>{
    res.send("Express Typescript");
});

app.get('/test',(req:Request,res:Response)=>{
    res.json({message:"Express typescript"});
});

app.get("/szemelyek",(req:Request,res:Response)=>{
    res.json(szemelyek);
});

app.get("/kutyanevek",(req:Request,res:Response)=>{
    db.all("select * from kutyanevek",(error,rows:Kutyanev[])=>{
        if(error){
            res.json({hiba:error.message});
        } else {
            if(rows.length>0){
                res.status(200).json(rows);
            } else {
                res.status(404).json({message:"Nincs ilyen adat!"});
            }
        }
    });
});

