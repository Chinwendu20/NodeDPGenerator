// Requiring all the modules needed for this 
// controller file

import cloudinary from "cloudinary" //The cloud storage used
//Used for parsing form data used specically for the files in this app
import {connect_pool as db } from './config.js' //The database pool
import Jimp from 'jimp' //Used for the image manipulation
import {query_function, quotes, validateObjModel, convert_to_png, Obtain_missing_element} from './helper.js'
import http from 'http'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';





export const PostView = async (req, res, next) => {

  try{

    var {error, value} = validateObjModel(req.body)

    if(error){

        return res.status(500).send(error.details.map(Obtain_missing_element))

    }

    if (req.file==undefined){

        return res.status(500).send({error: 'banner field is required'})
    }
    var link=req.body.link

   var qs=`select * from photo where link=${(quotes(link))}`

    var {rows, err}  = await query_function(qs)

    if (err){

        res.status(500).end()

        return next(err)
    }

    if (rows.length != 0){

        return res.status(500).json({error:'Link already in use'})

        } 

     var fileObj = await cloudinary.uploader.upload(req.file.path)

     const content=req.body

     content.banner= fileObj.url

       var columns = Object.keys(content).toString()
        var values = Object.values(content).map(quotes).toString()

        var query = `insert into photo ( ${columns} ) values ( ${values} )`

        var {rows, err}=await query_function(query)

        if (err){

            res.status(500).end()

            return next(err)
        }

        return res.status(201).json(content)  
  

    }catch(err){

        res.status()

        return next(err)


    }
}






export const PostGetUser=async (req, res, next)=>{
try{

    var slug=req.params.slug

    var query = `select * from photo where link=${(quotes(slug))}`

    var {rows, err} = await query_function(query)

    if(err){

        res.status(500).end()

        return next(err)
    }

if (rows.length == 0){
    
    return res.status(500).json({'error':'Record does not exist'})
    
    }


    delete rows[0].session

    return res.status(200).json(rows)
}catch(e){

 next(e)
return res.status(500).end()
}

}


export const PostUpdateView = async (req, res, next) =>{

try{

    // Obtaining id parameter from request url
    var id = req.params.id

    // Obtaining data for update from request body
    var updated_data=Object.keys(req.body)
   
        var content=[]
        var query_content=[]


        var length_of_loop = updated_data.length

        //Uploading new banner image if in request body
            if (req.file){

        var result = await cloudinary.uploader.upload(req.file.path)

        query_content.push('Banner'+'='+quotes(result.url))

        }

        if(req.body){


            if(req.body.link){

           var qs=`select * from photo where link=${(quotes(req.body.link))}`

            var {rows, err} = await query_function(qs) 

            if(err){

                res.status(500).end()

                return next(err)
            }

    if (rows.length !=0){

        return res.status(500).json({error:'Link already in use'})


        }

         } 
        

        for(let i=0;i<length_of_loop;i++){
            content = req.body[updated_data[i]]
            query_content.push(updated_data[i]+'='+quotes(content))

        
     }
      
     
  }


query_content=query_content.toString()

var query = `select * from photo where id=${id}`

var {rows, err}= await query_function(query)

if(rows.length == 0){

    res.status(400).json({error:'Invalid request, id does not exist'})
}

await db.query(`update photo set ${query_content} where id = ${id}`)



    if(err){

        res.status(500).end()

        next(err)

        return;
    }
    return res.status(200).json(rows)
    

}catch(e){
    res.status(500).end()
    return next(e)
}
}




export const PostDestroyView = async (req, res, next) =>{

try{
                var id = req.params.id

                var query = `select * from photo where id=${id}`

                var {rows, err}= await query_function(query)

                if(rows.length == 0){

                    return res.status(400).json({error:'Invalid request, id does not exist'})
                }

            await db.query(`delete from photo where id=${id}`)

            return res.status(204).end()
 }catch(error){

    next(error)
 }
}
 





export const PhotoManipulateView = async (req, res, next) =>{

try{

        if (req.file==undefined){

        return res.status(500).send({error: 'upload_photo field is required'})
    }
    var slug=req.params.slug

    var query = `select * from photo where link=${(quotes(slug))}`

    var {rows, err} = await query_function(query, next)

    if (rows[0] == undefined){

        return res.status(500).send({error: 'link does not exist'})
    }

    if(err){

        next(err)
    }
    var {id, banner, link, height, width, 
        position_x, position_y, border_radius, name, description}=rows[0]

    var get_image =  http.get(banner)

    get_image.on('response',  async (response)=>{

    var response_request_path = response.req.path

    let initial_slice_index= response_request_path.lastIndexOf("/")

    let filename = response_request_path.slice(initial_slice_index+1)

    var Banner_image=`./upload/${filename}${(uuidv4())}`

    var stream = fs.createWriteStream(Banner_image)

    response.pipe(stream)


   let PhotoUploaded = await Jimp.read(req.file.path);
   PhotoUploaded = PhotoUploaded.resize(+width,+height); 
   var Banner = await Jimp.read(Banner_image);
   Banner = Banner.resize(750, 750)

   Banner.composite(PhotoUploaded, +position_x, +position_y, {
      opacityDest: 1,
      opacitySource: 1
   })

    var upload_image='upload/newmage.png'
      await Banner.writeAsync(upload_image);

   var finished_image = await cloudinary.v2.uploader.upload(upload_image)

   return res.status(201).json({url: finished_image.url})
      get_image.on('error', error=>{
        next(error)
        return;
    })
})
}catch(err){

   return next(err)
    
}
}
