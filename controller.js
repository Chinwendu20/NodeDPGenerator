// Requiring all the modules needed for this 
// controller file

import cloudinary from "cloudinary" //The cloud storage used
//Used for parsing form data used specically for the files in this app
import {connect_pool as db } from './config.js' //The database pool
import Jimp from 'jimp' //Used for the image manipulation
import {query_function, download, quotes, obtain_data_fromSession } from './helper.js'
import http from 'http'
import fs from 'fs'





export const PostView = (req, res, next) => {

    console.log(req.headers)


    const content={Banner: req.file, Link: req.body.Link, Height: req.body.Height, Width: req.body.Width, 
            Position_x: req.body.Position_x, Position_y: req.body.Position_y, Border_radius: req.body.Border_radius, 
            Name: req.body.Name, Description:req.body.Description, session: req.session.id}

    const columns = []

    const values=[]

    let undefined_values={}

    for (let x in content){

        if (content[x]==undefined && x != 'Border_radius'){

            undefined_values[x] =`${x} cannot be empty`

            continue
        }
        if (Object.keys(undefined_values).length==0 && content[x] != undefined){

            values.push(content[x])

            columns.push(x)

            }
    }

    if (Object.keys(undefined_values).length!=0){


        res.status(500)

        res.json(undefined_values)
            console.log(res.getHeaders()['content-type'])
        return

    }

    var link=req.body.Link

   var qs=`select * from photo where link=${(quotes(link))}`

    query_function(qs, next).then(result=>

        {

    if (result.length !=0){

        res.status(500)

        res.json({error:'Link already in use'})

        return;

        } 

 

     cloudinary.uploader.upload(req.file.path).then(fileObj=>{

        content.Banner = fileObj.url

        var value = [...values]

        value.shift()

        value.unshift(fileObj.url)

        var column =[...columns]

        console.log(column)

        console.log(value)

        req.session.save((err)=>{

        if(err){

            next(err)
        }

        var query = `insert into photo ( ${column} ) values ( ${(value.map(quotes))} )`

        query_function(query, next)
        })

        
        

        res.status(201)

        delete content.session

        content.id = req.body.id

        res.json(content)

        return;

     })

    .catch(err=>{

        next(err)

        return;
    })

  })
}




export const PostGetUser=async (req, res, next)=>{
try{
    var slug=req.params.slug

    var query = `select * from photo where link=${(quotes(slug))}`

    console.log(query)

    var rows = await query_function(query, next)

    console.log(rows)
if (rows==null){
    
    res.status(500).json({'error':'Record does not exist'})
    
    }

    delete rows[0].session

    res.status(200).json(rows)
}catch(e){

next(e)
}

}

export const PostUpdateView = async (req, res, next) =>{

try{
    var id = req.params.id

        var updated_data=Object.keys(req.body)
        var content=[]
        var query_content=[]
        for(let i=0;i<updated_data.length;i++){
            content = req.body[updated_data[i]]
            query_content.push(updated_data[i]+'='+quotes(content))
            
        
     }
       

    var result = await obtain_data_fromSession(req, id, next)

if(result){

query_content=query_content.toString()
await db.query(`update photo set ${query_content} where id = ${id}`)

var query = `select * from photo where id=${id}`

var qs= await query_function(query)
    res.status(200)
    res.json(qs)
    return;
}

 res.status(403)
 res.json({'message':'Forbidden request'})
 return;
   

}catch(e){
    next(e)
}
}

export const PostDestroyView = async (req, res, next) =>{

try{
                var id = req.params.id

            var result = await obtain_data_fromSession(req, id, next)

            if (result){

            await db.query(`delete from photo where id=${id}`)

            res.status(204)

            res.json({message: 'Record deleted'})
            return;
        }else{

             res.status(403)
             res.json({'message':'Forbidden request'})
             return;

        }
 

 }catch(error){

    next(error)
 }
 }   





export const PhotoManipulateView = async (req, res, next) =>{

try{
    var slug=req.params.slug

    var query = `select * from photo where link=${(quotes(slug))}`

    var result = await query_function(query, next)
    console.log(result[0])
    var {id, banner, link, height, width, 
        position_x, position_y, border_radius, name, description}=result[0]

    console.log(banner)
    var get_image =  http.get(banner)

    get_image.on('response',  async (response)=>{

    var response_request_path = response.req.path

    let initial_slice_index= response_request_path.lastIndexOf("/")

    let filename = response_request_path.slice(initial_slice_index+1)

    var Banner_image=`./upload/${filename}`

    var stream = fs.createWriteStream(Banner_image)

    response.pipe(stream)



  console.log(Banner_image)
  console.log(req.file)
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
      var custom_dp_url;
   cloudinary.v2.uploader.upload(upload_image).then(y=>{
   res.status(201)

   // console.log(y)
   res.json({url: y.url})
   return;
})
.catch(err=>{
    next(err)
})
})

      get_image.on('error', error=>{
        next(error)
        return;
    })
}catch(err){

    next(err)
    return;
}
}
