import Sequelize from "sequelize";
const { Model } = Sequelize;

export default (sequelize, DataType) => {
    class User extends Model {}
    User.init({
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataType.STRING(45),
            allowNull: false
        },
        last_name: {
            type: DataType.STRING(45),
            allowNull: false
        },
        email: {
            type: DataType.STRING(45),
            allowNull: false
        },
        phone: {
            type: DataType.STRING(45),
            allowNull: false
        },
        comments: {
            type: DataType.STRING,
        },
        status: {
            type: DataType.STRING,
            defaultValue: "active"
        }
    }, {
        sequelize, modelName: "User"
    })

}

