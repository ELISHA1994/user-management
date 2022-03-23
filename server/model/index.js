import Sequelize from "sequelize";
import UserModel from "./user.model.js";
import {default as dbConfig} from "../../config/db_config.js";

// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//     host: dbConfig.HOST,
//     dialect: dbConfig.dialect,
//     logging: dbConfig.LOGGING,
//     pool: {
//         max: dbConfig.pool.max,
//         min: dbConfig.pool.min,
//         acquire: dbConfig.pool.acquire,
//         idle: dbConfig.pool.idle
//     }
// });
const sequelize = new Sequelize(
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
);
const db = {};

db.User = UserModel(sequelize, Sequelize.DataTypes);

db.Sequelize = Sequelize;
db.Op = Sequelize.Op;
db.sequelize = sequelize;

export const seedUserTable = async () => {
    await db.User.bulkCreate()
    for (const user of users) {
        await db.User.create({
            ...user
        });
    }
}

export default db;
