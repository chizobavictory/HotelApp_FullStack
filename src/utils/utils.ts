import Joi from 'joi';
import jwt from "jsonwebtoken";

export const createHotelSchema = Joi.object().keys({
    description:Joi.string().required(),
    image:Joi.string().required(),
    address:Joi.string().required(),
    price:Joi.number().required(),
    numOfBeds:Joi.number().required(),
    numOfBaths:Joi.number().required(),
    ratings:Joi.number().required()
    
})
export const updateHotelSchema = Joi.object().keys({
    description:Joi.string(),
    image:Joi.string(),
    address:Joi.string(),
    price:Joi.number(),
    numOfBeds:Joi.number(),
    numOfBaths:Joi.number(),
    ratings:Joi.number()
})

export const registerSchema = Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string().trim().lowercase().required(),
    phoneNumber: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
   confirm_password:Joi.ref("password"),
}).with("password", "confirm_password")

export const loginSchema = Joi.object().keys({
    email: Joi.string().trim().lowercase().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
})


//generate tokens

export const generateToken = (user:{[key: string]:unknown}):unknown=> {
  const pass = process.env.JWT_SECRET as string
  return jwt.sign(user, pass, {expiresIn:'7d'})
}
export const options = {
    abortEarly:false,
    errors:{
        wrap:{
            label: ''
        }
    }
}