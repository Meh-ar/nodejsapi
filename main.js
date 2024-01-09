const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data
const { login } = require('./handlers/login')
const sequelize = require('./database/sequelize-connect-database');
const Users = require('./models/User.models');
const router = require('./routes/tehran.routes');
const { error } = require('console');
const create_user = require('./handlers/create-user');
require('dotenv').config();




app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    console.log("cache is disabled")
    next();
});
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/tehran', router)






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