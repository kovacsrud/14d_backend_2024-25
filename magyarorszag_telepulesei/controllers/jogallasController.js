
const mysql=require('mysql');

const conn=mysql.createConnection(
    {
        user:"root",
        password:"",
        database:"magyar_telepulesek"
    }
);

const jogallaslista=(req,res)=>{
    conn.query("select jogallas from jogallas",(err,rows)=>{
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(rows);
        }

    });
}



module.exports={
    jogallaslista
}