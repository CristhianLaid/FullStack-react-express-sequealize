import { DataTypes } from 'sequelize';
import sequelize from '../../bd.js'


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    hooks: {
        beforeValidate: (user, options) => {
            // Eliminar espacios en blanco 
            if (user.email) {
                user.email = user.email.trim();
            };
            if (user.username) {
                user.username = user.username.trim();
            }
        }
    }
});

export default User;
