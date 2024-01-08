const app = require('express')
const router = app.Router();

router.get('/', (req, resp) => {
    resp.send('main tehran page').status(200)
})

router.get('/houses', (req, resp) => {
    resp.send("houses in tehran ");
})

router.get('/:id', async (req, resp) => {
    try {

        resp.status(200).send(req.params.id);

    }

    catch (error) {
        console.log(error)
        resp.status(500).send('internal server error')

    }
})

module.exports = router;
