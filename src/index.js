import express from 'express';

import routerAPi from './routes/index.js';
import connection from '../db/database.js';

const app = express();
const port = 3000;

routerAPi(app);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, async () => {
    try{
        await connection.authenticate();
        console.log('Connection has been established successfully.');
        console.log(`App listening at port: ${port}`)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});