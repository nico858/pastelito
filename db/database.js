import { Sequelize  } from 'sequelize';

import { config } from '.././src/config/config.js';

const connection = new Sequelize(
    config.dbName,
    config.dbUser,
    config.dbPassword,
    {
        host: config.dbHost,
        dialect: 'postgres',
        logging: false,
    }
);

export default connection;