
const  kutyanevek= (db)=>{
    return new Promise((resolve,reject)=>{
        db.all("select * from kutyanevek",(error,rows)=>{
            if(error){
                
                reject(error);

            } else {
                
                if(rows.length>0){
                    resolve(rows);
                } else {
                    resolve({message:"Nincs ilyen adat!"});
                }
            }
        }
        )
    })
}

const kutyafajtak=(db)=>{
    return new Promise((resolve,reject)=>{
        db.all("select * from kutyafajtak",(error,rows)=>{
            if(error){
                reject(error);
            }
            else {
                if(rows.length>0){
                    resolve(rows);
                } else {
                    resolve({message:"Nincs a feltételeknek megfelelő adat!"});
                }
            }
        })
    })
}



module.exports={
    kutyanevek,
    kutyafajtak
}