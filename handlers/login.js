

const Users = require('../models/User.models');

const app = require('express')


const login = async (req, resp) => {

    const { email, password } = req.body;

    const list = [email, password]

    console.log(req.body)

    const variablesExist = list.every(element => element !== null && element !== undefined)

    console.log("variablesExist", variablesExist)

    try {
        if (!variablesExist) {

            resp.status(400).send("bad request")
        }
        else {

            const user = await Users.findOne({

                where: {

                    email
                }
            })
            if (user) {

                if (user.password === password) {

                    console.log("password matches")
                    resp.status(200).send(`welcome to panel ${user.firstName}`);

                }
                else if (user.password !== password) {

                    console.log("password does not match")
                    resp.status(401).send("wrong credentials");
                }

                else {
                    console.log("error from inside if")
                }
            }

            else {

                resp.status(200).send("user's not found!!!")

            }
        }
    }
    catch (error) {

        resp.status(500).send("internal server error")

    }
}


module.exports = {
    login
};


