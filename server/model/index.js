import Sequelize from "sequelize";
import UserModel from "./user.model.js";
import {default as dbConfig} from "../../config/db_config.js";

let sequelize
if (process.env.NODE_ENV === "production") {
    sequelize = new Sequelize(
        process.env.DATABASE_URL,
        {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        }
    )
} else {
    sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        logging: dbConfig.LOGGING,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    });
}

const db = {};

db.User = UserModel(sequelize, Sequelize.DataTypes);

db.Sequelize = Sequelize;
db.Op = Sequelize.Op;
db.sequelize = sequelize;

export default db;
