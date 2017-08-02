import express from 'express'
import passport from 'passport'
const router = express.Router()

router.post('/login', passport.authenticate('local'), function (req, res) {
	res.redirect('/')
})

router.get('/logout', function (req, res) {
	req.logout()
	res.redirect('/')
})

module.exports = router
