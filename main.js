const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer') // v1.0.5
const upload = multer(); // for parsing multipart/form-data
const { login } = require('./handlers/login');
const sequelize = require('./database/sequelize-connect-database');
const router = require('./routes/auth.route');
const create_user = require('./handlers/create-user');
require('dotenv').config();
const path = require('path');
const winston = require('winston');

// Create a logger instance with Winston
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })
    ]
});
// Middleware for logging HTTP requests and responses
function loggerMiddleware(req, res, next) {
    const start = new Date();

    // Log request details
    logger.info({
        method: req.method,
        path: req.url,
        timestamp: start.toISOString(),
        body: req.body,
        headers: req.headers,
        query: req.query
    });

    res.on('finish', () => {
        const ms = new Date() - start;

        // Log response details
        logger.info({
            method: req.method,
            path: req.url,
            status: res.statusCode,
            timestamp: new Date().toISOString(),
            responseTime: `${ms}ms`,
            body: req.body,
        });
    });

    next();
}



//set template engine to ejs 
app.set('view engine ', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// adding the headers for not caching 
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    console.log("cache is disabled");
    next();
});
app.use(loggerMiddleware);


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/auth', router)


app.get('/', async (req, resp) => {
    console.log(Object.keys(req.query))
    resp.send("hello")
})


app.post('/create-user', create_user)


app.post("/login", login)


const port = process.env.PORT


app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        console.log(`we are listening on port ${port}`)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})