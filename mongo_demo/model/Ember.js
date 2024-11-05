const mongoose=require('mongoose');

const emberSchema=new mongoose.Schema({
    nev:{
        type:String,
        minLength:3,
        required:[true,"Adjon meg nevet"],
        lowercase:true        
    },
    email:{
        type:String,
        minLength:7,
        required:[true,"Az email cím megadása kötelező"],
        lowercase:true,
        unique:true
    },
    kor:{
        type:Number,
        min:1,
        max:110
    }
});

module.exports=mongoose.model('Ember',emberSchema);