
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

const megyetelepulesei=(req,res)=>{
    conn.query(
        `SELECT
        t.nev as telepulesnev,
        AVG(t.lat) as lat,
        AVG(t.long) as lng,
        t.kshkod,
        t.terulet,
        t.lakasok,
        m.nev as megyenev,
        j.jogallas
        from telepulesek as t
        INNER JOIN jogallas as j ON j.suly=t.jogallas
        INNER JOIN megyek as m ON m.kod=t.megyekod
        WHERE m.nev=?
        GROUP BY t.nev,t.kshkod,t.terulet,t.lakasok,m.nev,j.jogallas`,
    [req.params.megye],
    (err,rows)=>{
        if(err) return res.status(400).json(err);

        if(rows.length>0) return res.status(200).json(rows);
        
        return res.status(400).json({message:"Nincs ilyen megye!"})

    })
}


module.exports={
    megyelista,
    megyetelepulesei
}