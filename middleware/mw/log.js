const log=(req,res,next)=>{
    const idopont=new Date();
    const ev=idopont.getFullYear();
    const honap=idopont.getMonth()+1;
    const nap=idopont.getDate();
    const ora=idopont.getHours();
    const perc=idopont.getMinutes();
    
    console.log(`Időpont:${ev}.${honap}.${nap} ${ora}:${perc}`);
    console.log(`Method:${req.method}`);
    console.log(`Host:${req.hostname}`);
    console.log(`Path:${req.path}`);
    console.log(`Body:${JSON.stringify(req.body)}`);
    console.log(`Headers:${req.headers.host}`);
    console.log(req.get('user-agent'));

    next();

}

module.exports={log};