 import {connect_pool as db } from './config.js'


export async function query_function(query, cb){
 try{

 var { rows } = await db.query(query)

return rows


} catch(err){


cb(err)
return;
}
}

export function quotes(num){
    return "\'"+num+"\'"
}
export function download  (name, file, info) {

        const {filename, encoding, mimeType}=info

        const filePath = path.join(`./upload/${filename}`)

        file.pipe(fs.createWriteStream(filePath))


    }




export async function obtain_data_fromSession(req, id, next){

    let session_id = req.session.id

    console.log(897867565568678)

    console.log(session_id)

    console.log(id)

    var query = `select * from photo where session=${ (quotes(session_id)) } and id=${id}`

    try{

            var result = await query_function(query, next)
            return result
    }catch(e){
        next(e)
            return;
        }

    }

