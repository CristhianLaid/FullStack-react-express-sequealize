import User from "../../models/authModels/auth.models.js";
import bcryptPlugin from "../../plugins/bcrypt.plugin.js";
import { createAccessToken } from "../../libs/jwt.js"
import jwt from "jsonwebtoken";

class UserController {

    static async registerUser(req, res) {
        const { username, email, password } = req.body;
        try {
            const passwordHash = await bcryptPlugin.hashPassword(password);

            const existingUserWithEmail = await User.findOne({ where: { email } });
            if (existingUserWithEmail) return res.status(400).json({ message: ['Correo electrónico ya está en uso'] });

            const existingUser = await User.findOne({ where: { username } });

            if (existingUser) return res.status(400).json({ message: ['Nombre de usuario ya existe'] });

            const newUser = await User.create({
                username,
                email,
                password: passwordHash
            });

            const token = await createAccessToken({
                id: newUser.id,
                username: newUser.username
            });

            // res.cookieHandler(token);

            res.cookie("token", token, {
                httpOnly: false,
                secure: true,
                sameSite: "none",
            });

            return res.status(201).json({user: newUser, token });

        } catch (error) {
            return res.status(500).json({ error: 'Error al registrar usuario', message: error.message });
        }
    }


    static async loginUser(req, res) {
        const { email, password } = req.body;
        try {
            const userFound = await User.findOne({ where: { email } });
            if (!userFound) return res.status(404).json({ message: ['Usuario no encontrado.'] });

            const isPasswordValid = await bcryptPlugin.comparePassword(password, userFound.password);
            if (!isPasswordValid) return res.status(404).json({ message: ['Contraseña incorrecta.'] });

            const token = await createAccessToken({
                id: userFound.id,
                username: userFound.username
            });

            // res.cookieHandler(token);

            res.cookie("token", token, {
                httpOnly: false,
                secure: true,
                sameSite: "none",
            });

            return res.json({ user: userFound, token });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener usuario', message: error.message })
        };
    };

    static async logoutUser(req, res) {
        res.cookie("token", "", {
            httpOnly: true,
            secure: true,
            expires: new Date(0),
        });

        return res.sendStatus(200)
    };

    static async profileUser(req, res) {
        const { username } = req.user;
        try {
            const perfilUser = await User.findOne({ where: { username } });
            if (!perfilUser) return res.json(402).json({ message: ['User does not exits'] });
            return res.status(202).json(perfilUser)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        };
    };

    static async verifyToken(req, res) {
        const { token } = req.cookies;
        if (!token) return res.send(false);

        jwt.verify(token, '123', async (error, user) => {
            if (error) return res.sendStatus(401);

            const userFound = await User.findOne({ where: { id: user.id } });
            if (!userFound) return res.sendStatus(401);

            return res.json({
                user: {
                    id: userFound.id,
                    username: userFound.username,
                    email: userFound.email,
                }
            });
        });
    };


};

export default UserController;

