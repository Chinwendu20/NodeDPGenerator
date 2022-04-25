((err)=>{
    (()=>{
        console.log('Heelo')
    })()
})()

console.log('pop')

// const plot = require('pg').Pool
// const https=require('https')
// const fs = require('fs')
// const open=require('fs/promises').open
// const os = require('os')
// const path = require('path')
// const cloudinary = require("cloudinary")
// const dotenv = require('dotenv')

// var images = require('circle-image');
// var imageSizes = [240, 240, 120];
// //uniqueId param is used to identify a user 
// //so user the primary key or something guaranteed to be unique 
// (async ()=>{
//     images.execute('ProfilePicture.jpg', 90, imageSizes).then(function (paths) {
//   //array of circularized image paths 
//   console.log(0); //circle_user_{uniqueId}_150.png 
// } ) } ) ()
// // Include gm library
// // var gm = require('gm');
  
// // // Import the image

// // dotenv.config()
// // var rest;

// // cloudinary.config({ 
// //   cloud_name: process.env.cloud_name, 
// //   api_key: process.env.api_key, 
// //   api_secret: process.env.api_secret,
// //   secure: true
// // });
// // const Jimp = require('jimp') ;

// // // var url=cloudinary.image("Pictures/n16k8ppyozktgrkxppmx.jpg", {transformation: [
// // //   {radius: "max"},
// // //   {width: 186,height:186, crop: "scale"}
// // //   ]})

// // // result=/http.+\.(jpg|png|jpeg)/

// // // url=url.match(result)[0]
// // // console.log(url)

// // // var req = https.get(url)

// // // req.on('response',  (response)=>{

// // //     response_request_path = response.req.path

// // // var initial_slice_index= response_request_path.lastIndexOf("/")

// // // var filename = response_request_path.slice(initial_slice_index+1)




// // //     stream = fs.createWriteStream(`./horse.png`)




// // //     response.pipe(stream)
// // // console.log('kop')
    
// // // })


// // // req.on('error', error=>{
// // //     console.error(error.message)
// // //     next(error)
// // //     return;})

// // // (async ()=>{
// // //     // Reading watermark Image
// // //    let watermark = await Jimp.read("horse.png");
// // //    // watermark = watermark.resize(240,240); // Resizing watermark image
// // //    const image = await Jimp.read('maskyyy.jpg');
// // //    gm('horse.png').transparent('white').write("transparent1.png", function (err) {
// // //   if (err) console.log(err.message);
// // // })
// // //    //  const waterm= await Jimp.read('transparent1.png');
// //    // image.composite(waterm, 182, 134, {
// //    //    mode: Jimp.BLEND_SOURCE_OVER,
// //    //    opacityDest: 1,
// //    //    opacitySource: 1
// //    // })
// //    //    await image.writeAsync('newmage.png');
// //    // console.log("Image is processed successfully");
// // // })()
// // // async function imageOverlay() { // Function name is same as of file
// // // // Reading watermark Image
// // //    let watermark = await Jimp.read("horse.png");
// // //    // watermark = watermark.resize(240,240); // Resizing watermark image
// // // // Reading original image
// // //    const image = await Jimp.read('resize_banner.png');
// // //    image.composite(watermark, 182, 134, {
// // //       mode: Jimp.BLEND_SOURCE_OVER,
// // //       opacityDest: 1,
// // //       opacitySource: 1
// // //    })
// // //    await image.writeAsync('newImage.png');
// // //    console.log("Image is processed successfully");
// // // }

// // // // Calling this function using async
// // // imageOverlay();
// // // var man = new plot({user:'trvzxtqcqfivdt', host:'ec2-34-192-210-139.compute-1.amazonaws.com', 
// // //     database:'dbd302m3kadv8q', password:'d984e3dc71c7a3273337c30e15f29dc542142a48a82a2ab4a3061855a7909880', 
// // //     port:5432, ssl:{require: true, rejectUnauthorized: false}})

// // // var content={Banner: "https://res.cloudinary.com/dzfhuefpa/image/upload/v1648266462/mzhgmr87hpwlh2x5nydc.jpg", Link: 'testlink', Height: '130', Width: '126', 
// // //             Position_x: '128', Position_y: '121', 
// // //             Name: 'Nameof', Description:'The description of namey'}



// // // var req = https.get(content.Banner)

// // // req.on('response',  (response)=>{

// // // //     response_request_path = response.req.path

// // // // var initial_slice_index= response_request_path.lastIndexOf("/")

// // // // var filename = response_request_path.slice(initial_slice_index+1)




// // // //     stream = fs.createWriteStream(`./${filename}`)




// // // //     response.pipe(stream)
// // // var rest=5
    
// // // })

// // // console.log(5)

// // // // req.on('error', error=>{
// // // //     console.error(error.message)
// // // //     next(error)
// // // //     return;})




// // // // req.on('response', error=>{console.log(error)})



// // // // var columns = Object.keys(content)

// // // // var values=[]

// // // // let undefined_values={}

// // // // for (let x in content){

// // // //         if (content.x=undefined){

// // // //             undefined_values.x=`${x} cannot be empty`

// // // //             continue
// // // //         }
// // // //         if (Object.keys(undefined_values).length==0){

// // // //             values.push(content[x])

// // // //             }
// // // //     }

// // // //     if (Object.keys(undefined_values).length!=0){

// // // //        console.log('There are undefined values')

// // // //     }

// // //  async function query_function(query, cb){
// // //  try{

// // //  var  { rows } = await man.query(query)

// // //  return rows
// // // // var tf.rows= await man.query(query)
// // // // var rows =JSON.parse(rows)
// // // // console.log(rows[0].banner)
// // // // if (cb){

// // // //     return cb(rows)
// // // // }return 1

// // // // console.log(rows[0].banner)
// // // } catch(err){
// // // console.log(err.message)
// // // return;
// // // }}


// // // // // throw new Error(err)
// // // // }
// // // // }
// // // function quotes(num){
// // //     return "\'"+num+"\'"
// // // }
// // // // column=[...columns]

// // // // value=[...values]


// // // // // value=value.map(quotes)

// // // // console.log(column)

// // // // console.log(value)

// // // // qs =`insert into photo ( ${column} )   values ( ${value} )`, column, value

// // // // // console.log(qs, column, value)
// // // // query_function(qs)

// // // // var slug = quotes('linkyy')

// // // // query = `select * from photo where link=${slug}`

// // // // async function one (){
// // // // var pop = await query_function(query, rows=>{
// // // //     return rows[0].name
// // // // })

// // // // return pop
// // // // }

// // // // let lot = one()
// // // // lot=query_function(query)
// // // // result = lot.then(result=> {

// // // //     var {id,photo_url, link_slug, height, width, position_x, position_y, border_radius, name, description}=result[0]
// // // //     cloudinary.image("sample.jpg", {transformation: [
// // // //   {overlay: {font_family: "Times", font_size: 100, text: "Welcome"}},
// // // //   {flags: "layer_apply", gravity: "south", y: "0.05"}
// // // //   ]})


// // // // (async ()=>{
// // // // try{
// // // //     res= await cloudinary.uploader.upload("horse.jpeg", folder="Pictures")
// // // //     console.log(res)
// // // // }catch(e){
// // // //     console.log(e.message)
// // // // }})()

// // // cloudinary.v2.uploader.upload("horse.png", {folder:"Pictures"}).then(y=>{console.log(y)
// // // )
// // // })

// // console.log(cloudinary.image("Pictures/pxtdauuy33ire9wzw0q7.jpg", {effect: "make_transparent:100"}))
// // // var url=cloudinary.image("Pictures/n16k8ppyozktgrkxppmx.jpg", 
// // //     {transformation: [
// // //   // {gravity: "face", height: 400, width: 400, crop: "crop"},
// // //   // {radius: "max"},
// // //   {width: 240, height:240, crop: "scale"}
// // //   ]})

// // // var url12=cloudinary.image('mzhgmr87hpwlh2x5nydc.jpg', 
// // //     {transformation: [
// // //   // {gravity: "face", height: 400, width: 400, crop: "crop"},
// // //   // {radius: "max"},
// // //   {width: 750, height:750, crop: "scale"}
// // //   ]})


// // // url12=url12.match(result)[0]
// // // console.log(url12)



// // // console.log(cloudinary.image("mzhgmr87hpwlh2x5nydc.jpg", {transformation: [
// // //   {overlay: {url: url}},
// // //   {flags: "layer_apply", gravity:"west", y: "234"}
// // //   ]}))
// // // // console.log(cloudinary.image("mzhgmr87hpwlh2x5nydc.jpg"))
// // // // // })
// // // // // var {id,photo_url, link_slug, height, width, position_x, position_y, border_radius, name, description}=result[0]

// // // // // console.log(result)

// // // // // var x;

// // // // // (()=>{x=9})()

// // // // // console.log(x)



