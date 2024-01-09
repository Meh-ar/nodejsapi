const express = require('express');
const router = express.Router();


router.get('/login', async (req, resp) => {
    resp.render('login.ejs')

})
router.get('/register', async (req, resp) => {
    resp.render('register.ejs')

})

module.exports = router