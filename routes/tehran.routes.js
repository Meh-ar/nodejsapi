const app = require('express')
const router = app.Router();

router.get('/', (req, resp) => {
    resp.send('main tehran page').status(200)
})

router.get('/houses', (req, resp) => {
    resp.send("houses in tehran ");

})

module.exports = router
