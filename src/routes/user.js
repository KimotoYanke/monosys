import express from 'express'
import passport from 'passport'
import User from '../models/user'
const router = express.Router()

router.post('/login', passport.authenticate('local'), function (req, res) {
    res.redirect('/')
})

router.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
})

router.post('/register', function (req, res) {
    if (req.body.username === 'unloggedin') {
        res.redirect('/')
        return
    }
    User.register(new User({ username: req.body.username }), req.body.password, function (err, account) {
        if (err) {
            return res.send(err)
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/')
        })
    })
})

router.get('/loggedin', function (req, res) {
    res.send(req.isAuthenticated() ? req.user.username : '')
})

module.exports = router
