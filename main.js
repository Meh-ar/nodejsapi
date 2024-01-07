const express = require('express');

const app = express();

const port = 8888;

const sequelize = require('./database/sequelize-connect-database')

const Users = require('./models/User.models')


const router = require('./routes/tehran.routes')


app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    console.log("cache is disabled")
    next();
});


app.use('/tehran', router)


app.get('/', async (req, resp) => {

    const users = await Users.findAll()

    console.log(Object.keys(req.query))

    resp.send("hello")

})


app.get('/create-user', async (req, resp) => {

    const user = await Users.create({ firstName: resp.query.firstname, lastName: resp.query.lastname, password: resp.query.password, email: resp.query.email });

    await resp.send(user)

})



app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        await Users.sync();
        console.log('Connection has been established successfully.');
        console.log(`we are listening on port ${port}`)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})