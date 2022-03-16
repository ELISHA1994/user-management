import Sequelize from "sequelize";
import UserModel from "./user.model.js";
import {default as dbConfig} from "../config/db_config.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
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

const db = {};

db.USER = UserModel(sequelize, Sequelize.DataTypes)

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;
