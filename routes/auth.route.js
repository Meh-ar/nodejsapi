const express = require('express');
const auth = express.Router();


auth.get('/login', async (req, resp) => {

    resp.render('login')

})

auth.get('/register', async (req, resp) => {

    resp.render('register')

})

module.exports = auth