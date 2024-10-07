
const mysql=require('mysql');

const conn=mysql.createConnection(
    {
        user:"root",
        password:"",
        database:"magyar_telepulesek"
    }
);

const megyelista=(req,res)=>{
    conn.query("select nev as megyenev from megyek order by megyenev",(err,rows)=>{
        if(err) return res.status(400).json(err);

        return res.status(200).json(rows);
    })

}


module.exports={
    megyelista
}