

const Users = require('../models/User.models');

const app = require('express');

const jwt = require('jsonwebtoken');


const login = async (req, resp) => {

    const { email, password } = req.body;


    const list = [email, password]


    console.log(req.body)


    const variablesExist = list.every(element => element !== null && element !== undefined)


    console.log("variablesExist", variablesExist)

    try {

        if (!variablesExist) {

            resp.status(400).render('login', { "errorMessage": "user name or password is empty" })
        }

        else {

            const user = await Users.findOne({

                where: {

                    email

                }
            })

            if (user) {


                if (user.password === password) {

                    const token = jwt.sign({ "username": user.email, "userid": user.id }, process.env.JSON_TOKEN)

                    console.log("password matches")

                    console.log(user)

                    resp.cookie('token', token, { maxAge: 3 * 1 * 60 * 60, path: "/" })

                    resp.status(301).redirect('/user/profile')

                }

                else if (user.password !== password) {

                    console.log("password does not match");

                    resp.render('login', { "errorMessage": "wrong credentials" });

                }
                else {

                    console.log("error from inside if")

                }

            }
            else {
                resp.render('login', { "errorMessage": "user's not found" })
            }
        }
    }
    catch (error) {

        console.log(error)

        resp.status(500).send("internal server error")
    }
}


module.exports = {
    login
};


