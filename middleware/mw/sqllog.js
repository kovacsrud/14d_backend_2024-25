const mysql=require('mysql');

const conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"log"
});

const sqllog=(req,res,next)=>{
    conn.query("INSERT INTO backendlog (method,hostname,path,body,headers,useragent) values (?,?,?,?,?,?)"
        ,[req.method,req.hostname,req.path,JSON.stringify(req.body),req.headers.host,req.get('user-agent')]
        ,(error)=>{
            if(error){
                console.log(error);
            }
        });
    
   next();     
}

module.exports={sqllog};