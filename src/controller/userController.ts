import {Request, Response, NextFunction,} from "express"
import {v4 as uuidv4} from 'uuid'
import { UserInstance } from "../model/user";
import { hotelInstance } from "../model/hotel";
import { registerSchema, loginSchema, generateToken, options } from "../utils/utils";
import bcrypt from "bcryptjs"
import http from "http";




export async function registerUsers(req:Request, res:Response, next:NextFunction){
    const user_id = uuidv4()
    console.log(req.body)
    try {
        const validationResult = registerSchema.validate(req.body, options)
        if(validationResult.error){
            return res.status(400).json({
                Error: validationResult.error.details[0].message
            })
        }
        const emailDuplicates = await UserInstance.findOne({where:{email:req.body.email}})
        if(emailDuplicates){
            return res.status(409).json({
                msg: "Email has been used, please change email"
            })
        }

        const phoneNoDuplicates = await UserInstance.findOne({where: {phoneNumber:req.body.phoneNumber}})
        if(phoneNoDuplicates){
            return res.status(409).json({msg: "phone number has been used"})
        }

        const passwordHash = await bcrypt.hash(req.body.password, 8)
        const record = await UserInstance.create({
            id: user_id,
            fullName: req.body.fullName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: passwordHash,

        })
        //return res.json(record)
        res.render("login")
        // res.status(200).json({
        //     msg: "you have sucessfully created a user",
        //     record
        // })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            msg: 'failed to register',
            route: '/register'
        })
    }
}

export async function loginUser(req:Request, res:Response, next:NextFunction){
    const id = uuidv4()
    try {
        const validationResult = loginSchema.validate(req.body, options)
        if(validationResult.error){
                return res.status(400).json({
                        Error:validationResult.error.details[0].message
                    })
                }
                const hotelUser = await UserInstance.findOne({where: {email:req.body.email}}) as unknown as {[key:string]:string}
                
                const {id} = hotelUser
                const token = generateToken({id})
                res.cookie("auth", token, {httpOnly:true, secure: true})
                res.cookie("id", id, {
                    httpOnly:true,
                    secure:true
                })

                const validHotelUser = await bcrypt.compare(req.body.password, hotelUser.password);
        
                
                if(!validHotelUser){
                res.status(401).json({
                message: "password do not match",
                })
        }
        if(validHotelUser){
            // res.status(200).json({
            //     message: "Sucessfully logged in",
            //     token,
            //     hotelUser
            // })
             res.redirect('/')
        }
    } catch (error) {
        res.status(500).json({
            message: "failed to login",
            route: "/login"
        })
    }
}

export async function getUsers(req:Request, res:Response, next:NextFunction){
    try {
        const limit = req.query?.limit as number | undefined
        const offset = req.query?.offset as number | undefined
        //const record = await hotelInstance.findAll({where: {}})
        const record = await UserInstance.findAndCountAll({limit, offset, include: 
            [{
            model:hotelInstance,
            as: 'hotel'
            }]
    })
        res.status(200).json({
            msg: "All Hotels fetched successfully",
            count: record.count,
            record: record.rows
        })
    } catch (error) {
        res.status(500).json({
            msg:"failed to fetch hotels",
            route: "/read"
        })
    }
}
export  function logout(req: Request, res: Response){
    res.clearCookie('auth');
    res.clearCookie('id');
    res.status(200).json({
        message: "you have successfully logged out"
    })
    // res.redirect('/signin')
}

export async function renderRegisterPage(req: Request, res: Response, next: NextFunction) {
    res.render('register')
}
export async function renderLoginPage(req: Request, res: Response, next: NextFunction) {
    res.render('login')
}
export async function renderHomePage(req: Request, res: Response, next: NextFunction) {
    res.render('home')
}
export async function renderListingPage(req: Request, res: Response, next: NextFunction) {
    try {
    const user = await UserInstance.findOne({where: {id: req.cookies.id}, include:[{model: hotelInstance, as: 'hotels'}]});
    res.render('listing1', {user})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'failed to render listing1'})
        
    }
   
}

export function renderSecListingPage(req: Request, res: Response, next: NextFunction) {
    http.get('http://localhost:4000/hotels/read', (response) => {
        response.setEncoding('utf8');
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            const useData = Array.isArray(JSON.parse(data).record) ? JSON.parse(data).record : [JSON.parse(data).record];
            res.render('listing2', {useData});
        });
    });
}   

