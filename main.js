const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer') // v1.0.5
const upload = multer(); // for parsing multipart/form-data
const { login } = require('./handlers/login');
const sequelize = require('./database/sequelize-connect-database');
const create_user = require('./handlers/create-user');
require('dotenv').config();
const path = require('path');
const userRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser())

//morgan custom formating

morgan.token('reqbody', function (req, res) { return `request body: ${JSON.stringify(req.body)}` })
morgan.token('resbody', function (req, res) { return `response body: ${JSON.stringify(res.body)}` })


//set template engine to ejs 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// adding the headers for not caching 

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    console.log("cache is disabled");
    next();
});

//loogers
app.use(morgan('dev'))
app.use(morgan(':reqbody', { skip: (req, res) => { return req.body == undefined } }));
app.use(morgan(':resbody', { skip: (req, res) => { return res.body == undefined } }));

//route handlers
app.use('/auth', authRouter)
app.use('/user', userRouter)



//routes
app.get('/', async (req, resp) => {
    console.log(Object.keys(req.query))
    resp.send("hello")
})


app.post('/create-user', create_user)


app.post("/login", login)


const port = process.env.PORT
sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully');
  })
  .catch(err => {
    console.error('Database synchronization failed:', err);
  });


app.listen(port, async () => {
    try {
        await sequelize.authenticate();

        console.log('Connection has been established successfully.');

        console.log(`we are listening on port ${port}`)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})