import {Request, Response, NextFunction} from "express"
import {v4 as uuidv4} from 'uuid'
import { hotelInstance } from "../model/hotel";
import { UserInstance } from "../model/user";
import { createHotelSchema, updateHotelSchema, options } from "../utils/utils";


export async function createHotels(req:Request | any, res: Response, next:NextFunction){
    const id = uuidv4()
    try {
        const userId = req.user.id;
        const validationResult = createHotelSchema.validate(req.body,options)
        if(validationResult.error){
           return res.status(400).json({
              Error: validationResult.error.details[0].message
           })
        }
        const record = await hotelInstance.create({id, ...req.body, userId})
        // res.status(201).json({
        //     msg: "you have sucessfully created a hotel listing",
        //     record
        // })
        res.redirect("/users/listing1")
    } catch(err) {
        res.status(500).json({
            msg: 'failed to create',
            route: '/create'
        })
    }
}

export async function getHotels(req:Request, res:Response, next:NextFunction){
    try {
        const limit = req.query?.limit as number | undefined
        const offset = req.query?.offset as number | undefined
        //const record = await hotelInstance.findAll({where: {}})
        const record = await hotelInstance.findAndCountAll({limit, offset, include: 
            [{
            model:UserInstance,
            attributes: ['id', 'fullName', 'email', 'phoneNumber'],
            as: 'user'
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

export async function getSingleHotel(req:Request, res:Response, next: NextFunction){
    try {
        const {id} = req.params
        
        const record = await hotelInstance.findOne({where:{id}})
        return res.status(200).json({
            msg: "Single Hotel Information successfully fetched",
            record
        })
    } catch (error) {
        res.status(500)
        res.json({
            msg: "Failed to read single hotel information",
            route: "/read/:id"
        })
    }
}

export async function updateHotels(req:Request, res:Response, next:NextFunction){
    try {
        const {id} = req.params
        const{description, image, address, price, numOfBeds, numOfBaths,ratings} = req.body

       const validationResult = updateHotelSchema.validate(req.body, options)
       if(validationResult.error){
        return res.status(400).json({
            Error:validationResult.error.details[0].message
        })
    }
    const record = await hotelInstance.findOne({where: {id}})
    if(!record){
        return res.status(404).json({
            Error: "Cannot find existing hotel"
        })
    }
    const updateRecord = await record?.update({
        description: description,
        image: image,
        address: address,
        price: price,
        numOfBeds: numOfBeds,
        numOfBaths: numOfBaths,
        ratings: ratings, 
    })
    res.redirect("/users/listing1")
    // res.status(200).json({
    //     msg: "You have successfully updated your hotel",
    //     updateRecord
    // })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "failed to update",
            route: "/update/:id"
        })
    }
}

export async function deleteHotel(req:Request, res:Response, next:NextFunction){
    try {
        const {id} = req.params
        const record = await hotelInstance.findOne({where: {id}})

        if(!record){
            return res.status(404).json({
               msg: "Cannot find hotel" 
            })
        }
        const deleteRecord = await record.destroy()
        // return res.status(200).json({
        //     msg: "Hotel deleted successfully",
        //     deleteRecord
        // })
        res.render("listing1")
    } catch (error) {
        res.status(500).json({
            msg: "failed to delete",
            route: "/delete/:id"
        })
    }
}