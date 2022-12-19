import {DataTypes, Model} from "sequelize";
import db from "../config/database.config";
import { hotelInstance } from "./hotel";


interface UserAttributes {
    id: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    password: string,
}

export class UserInstance extends Model <UserAttributes> {}

UserInstance.init({
    id:{
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    fullName:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{
                msg:'fullName is required'
            },
            notEmpty:{
                msg:'Please provide a fullName'
            }
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{
                msg:'email is required'
            },
            isEmail:{
                msg:'Please provide an email'
            }
        }
    },
    phoneNumber:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{
                msg:'phone number is required'
            },
            notEmpty:{
                msg:'Please provide a phone number'
            }
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{
                msg:'password is required'
            },
            notEmpty:{
                msg:'Please provide a password'
            }
        }
    },
    
}, {
    sequelize:db,
    tableName: "users"
});

UserInstance.hasMany(hotelInstance, {foreignKey: "userId", as: "hotels"})

hotelInstance.belongsTo(UserInstance, {foreignKey: "userId", as: "user"})