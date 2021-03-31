const { Router } = require('express')
const ctrl = require('./controllers')

const router = Router()

// router.get('/', (req, res) => {
//     res.render('index')
// })

router.get('/altwords/:word', ctrl.getAltWords)

router.post('/translate', ctrl.translate)

module.exports = router