const tesztmw=(req,res,next)=>{
    console.log("Middleware próba");
    next();
}

module.exports={tesztmw};