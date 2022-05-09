 import {connect_pool as db } from './config.js'
 import Joi from 'Joi'






//User-defined function to validate the user
export function validateObjModel(ObjModel)
{
    const JoiSchema = Joi.object({
    
        link:Joi.string()
            .required(),
        height:Joi.number()
            .integer()
            .required(),
        width:Joi.number()
            .integer()
            .required(),
        position_x:Joi.number()
            .integer()
            .required(),
        position_y:Joi.number()
            .integer()
            .required(),
        border_radius:Joi.number()
            .integer()
            .optional(),
        name:Joi.string()
            .required(),
        description:Joi.string()
            .required(),
        session:Joi.string()
            .alphanum()
            .optional(),

                
    }).options({ abortEarly: false });

    return JoiSchema.validate(ObjModel)
}


export function convert_to_png(err, image, _name){
    if (err){
        return next(err)
    }
    image.write(`${_name}.png`)
}



export async function query_function(query){
 try{

 var { rows } = await db.query(query)

return {rows:rows, err:undefined}


} catch(err){

return {rows:undefined, err:err}
}
}

export function quotes(num){
    return "\'"+num+"\'"
}


export function Obtain_missing_element(item){

    return item.message
}



