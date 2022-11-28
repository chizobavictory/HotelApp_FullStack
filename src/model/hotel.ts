import {DataTypes, Model} from "sequelize";
import db from "../config/database.config";

interface hotelAttributes {
    description: string,
    image: string,
    address: string,
    price: number,
    numOfBeds: number,
    numOfBaths: number,
    ratings: number
    id: string,
    userId: string
}

export class hotelInstance extends Model <hotelAttributes> {}

hotelInstance.init({
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false
    },
    price:{
        type: DataTypes.NUMBER,
        allowNull: false
    },
    numOfBeds:{
        type: DataTypes.NUMBER,
        allowNull: false
    },
    numOfBaths:{
        type: DataTypes.NUMBER,
        allowNull: false
    },
    ratings:{
        type: DataTypes.NUMBER,
        allowNull: false
    },
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    userId:{
        type:DataTypes.STRING
    }
    
}, {
    sequelize:db,
    tableName: "hotels"
})