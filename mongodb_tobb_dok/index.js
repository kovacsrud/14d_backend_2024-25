const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const dotenv=require('dotenv').config();
const {User,Post}=require('./model/BlogSchema');

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

mongoose.connect(process.env.MONGO_CONNECT)
.then(()=>console.log("Connected to mongodb"))
.catch(err=>console.log(err));

app.listen(8000,()=>{console.log("Fut a szerver")});

app.get('/',(req,res)=>{
    res.send("MongoDB");
});

app.post('/user',async (req,res)=>{
    const{username,name,email}=req.body;
    const user=await User.findOne({username:username});

    if(user){
        return res.status(400).json({message:"A felhasználói név foglalt!"});
    }
    const e_mail=await User.findOne({email:email});
    if(e_mail){
        return res.status(400).json({message:"Ezzel az e-mail címmel már regisztráltak!"});
    }
    if(!username || !name || !email){
        return res.status(400).json({message:"Hiányos adatok!"});
    }

    const newUser=await User.create({
        username:username,
        name:name,
        email:email
    });

    return res.json(newUser);

});


app.post('/post',async (req,res)=>{
    const{userId,cim,tartalom}=req.body;
    try {
        const user=await User.findById(userId);

        if(!user){
            return res.status(400).json({message:"Nincs ilyen felhasználó!"});
        }

        if(!cim || !tartalom){
            return res.status(400).json({message:"Hiányos adatok!"});
        }

        const ujPost=await Post.create({
            cim:cim,
            tartalom:tartalom,
            szerzo:user._id
        });

        return res.json(ujPost);

    } catch (error) {
        if(error.name==="ValidationError"){
            return res.status(400).json({message:'Validációs hiba!',details:error.errors})
        }
        console.log(error);
        res.status(500).json({error:"Nem sikerült az új post létrehozása!"})
    }

});

