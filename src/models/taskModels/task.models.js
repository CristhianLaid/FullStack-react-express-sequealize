import { DataTypes } from "sequelize";
import sequelize from "../../bd.js";
import User from "../authModels/auth.models.js";

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

Task.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',  
    onUpdate: 'CASCADE'
})



export default Task;