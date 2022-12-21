"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const hotel_1 = require("./hotel");
class UserInstance extends sequelize_1.Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'fullName is required'
            },
            notEmpty: {
                msg: 'Please provide a fullName'
            }
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'email is required'
            },
            isEmail: {
                msg: 'Please provide an email'
            }
        }
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'phone number is required'
            },
            notEmpty: {
                msg: 'Please provide a phone number'
            }
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'password is required'
            },
            notEmpty: {
                msg: 'Please provide a password'
            }
        }
    },
}, {
    sequelize: database_config_1.default,
    tableName: "users"
});
UserInstance.hasMany(hotel_1.hotelInstance, { foreignKey: "userId", as: "hotels" });
hotel_1.hotelInstance.belongsTo(UserInstance, { foreignKey: "userId", as: "user" });
