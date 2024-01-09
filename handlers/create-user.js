
const Users = require('../models/User.models')

const create_user = async (req, resp) => {

    const { name, lastname, password, email } = req.body
    const list = [name, lastname, password, email];

    try {
        const allVarsExist = list.every(element => element !== null && element !== undefined);

        console.log(allVarsExist);

        if (!allVarsExist) { resp.status(400).send("a variable does not exist ") }

        else {

            const user = await Users.create({
                firstName: name,
                lastName: lastname,
                password: password,
                email: email
            });

            resp.send(user).status(200)
        }
    }
    catch (error) {

        console.log(error);
        resp.send(500)
    }
}


module.exports = create_user