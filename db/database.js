import { Sequelize  } from 'sequelize';

const connection = new Sequelize(
    'store',
    'postgres',
    'admin123',
    {
        host: 'localhost',
        dialect: 'postgres',
        logging: false,
    }
);

export default connection;