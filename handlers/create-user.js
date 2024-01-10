
const Users = require('../models/User.models')

const create_user = async (req, resp) => {

    const { name, lastname, password, email } = req.body

    const list = [name, lastname, password, email];

    try {

        const allVarsExist = list.every(element => element !== null && element !== undefined);

        console.log("not all variables are set");

        if (!allVarsExist) {
            resp.status(400).render('register', { 'errorMessage': 'all parameters do not exist' })
        }

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

        console.log("error inside catch", error);
        resp.send(500)

    }
}


module.exports = create_user