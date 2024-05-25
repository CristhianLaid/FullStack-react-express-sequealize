import app from "./app.js";
import sequelize from "./bd.js";

const PORT = 3000 | process.env.PORT;

(async () => {
    try {
        await sequelize.sync({force: false});
        app.listen(PORT, () => {
            console.log(`Server arrancado en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log('The server is not starting ')
    }
})();

