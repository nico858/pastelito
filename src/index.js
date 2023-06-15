import express from 'express';
import swaggerjsdoc from 'swagger-jsdoc';
import swagger from 'swagger-ui-express';
import cors from 'cors';
import session from 'express-session';

import routerAPi from './routes/index.js';
import connection from '../db/database.js';
import { checkApiKey } from './middlewares/auth.handler.js';

const app = express();
const port = 3000;

routerAPi(app);

app.use(express.json());
app.use(cors());

import passport from 'passport';

import { LocalStrategy } from './utils/aut/strategies/local.strategy.js';
import { jwtStrategy } from './utils/aut/strategies/jwt.strategy.js';
import { googleStrategy } from './utils/aut/strategies/google.strategy.js';

app.use(
    session({
      secret: 'secret-key',
      resave: false,
      saveUninitialized: true,
    })
);
  

passport.use(LocalStrategy);
passport.use(jwtStrategy);
passport.use(googleStrategy);

passport.serializeUser((user, done) => {
    done(null, user);
})

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Store API',
            version: '1.0.0',
            description: 'A simple Express Store API',
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1'
            }
        ]
    },
    apis: ['./src/routes/*.js']
}
const spacs = swaggerjsdoc(options);
app.use(
    '/docs',
    swagger.serve,
    swagger.setup(spacs)
)

app.get('/', /*checkApiKey,*/ (req, res) => {
    res.send('Hello World!');
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Redirect or respond with the user profile information
    res.json(req.user, req.accessToken, req.refreshToken);
  }
);

app.get('/auth/google/logut', (req, res) => {
    req.logout();
    res.redirect('/');
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