// import pkg from 'pg';
// const { Pool } = pkg;

// const pool = ( () => {
//     try {
//         new Pool({
//             user: 'postgres',
//             host: 'localhost',
//             database: 'Task',
//             password: '123',
//             port: 5432,
//         });
//         console.log("Base Conectada con exito...")
//     } catch (error) {
//         console.log("Ocurrio un error al conectar la bd")
//     }

// })();

// export default pool;

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:123@localhost:5432/Task');

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });


export default sequelize;





