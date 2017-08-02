import express from 'express'
import Users from './users'
const router = express.Router()

router.get('/', function (req, res) {
	res.render('index', { title: 'Express' })
})

router.route('/user', Users)

module.exports = router
