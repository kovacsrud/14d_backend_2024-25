const express=require('express');
const cors=require('cors');
const {tesztmw}=require('./mw/tesztmw');
const {log}=require('./mw/log');
const {sqllog}=require('./mw/sqllog');
const { check, body, validationResult } = require('express-validator');


const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(tesztmw);
app.use(log);
app.use(sqllog);


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

app.post('/regisztracio',
    check('usernev').isLength({min:3,max:20}).whitelist("abcdefghijklmno12345").withMessage("A hossz 3 és 20 között kell hogy legyen").trim().escape(),
    body('password').isLength({min:8,max:20}).withMessage("Min 8, max 20 karakter a jelszó!").trim().escape(),
    body('teljesnev').isLength({min:7}).withMessage("A név min 7 karakter").trim().escape(),
    body('email').isEmail().withMessage("Ez nem email cím!").trim().escape(),
    body('szuldatum').isDate().withMessage("Dátumot kell megadni!").trim().escape()
    ,(req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({"Hibák":errors.array()})
        } else {
            console.log(req.body);
            res.json({message:"Sikeres regisztráció!"});
        }

})