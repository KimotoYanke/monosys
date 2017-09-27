import express from 'express'
import User from './user'
const router = express.Router()

router.get('/', function (req, res) {
    res.render('index', { title: 'Express' })
})

router.use('/user', User)

module.exports = router
