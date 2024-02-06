const express = require('express')
const router = express.Router()
const User = require('../models/User.models');
const jwt = require('jsonwebtoken');


router.get('/profile', async (req, res) => {

    const { token } = req.cookies

    console.log(token, "token")
    try {
        if (token) {

            const decoded = jwt.verify(token, process.env.JSON_TOKEN);

            const user = await User.findOne({
                where: {
                    email: decoded.username
                }
            })
            if (user) {
                console.log("user exists", user)
                console.log(decoded)
                res.render('profile', { "user": user });
            }
        }
        else {

            res.redirect("/auth/login")

        }
    }
    catch (error) {

        console.log(" error in user.route.js");

        res.status(301).redirect('/auth/login');

    }

})


module.exports = router