/*eslint no-console:0*/
import fs from 'fs'
import express from 'express'
import expressSession from 'express-session'
import path from 'path'
import logger from 'morgan'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import sassMiddleware from 'node-sass-middleware'
import restify from 'express-restify-mongoose'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import index from './routes/index'

import Thing from './models/thing'
import User from './models/user'

const app = express()
const router = express.Router()

// the promise of Mongoose is the native Promise
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/database', {
    useMongoClient: true }).then(() => {
    console.log('I\'m Running.')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if (app.get('env') === 'production') {
    const stream = fs.createWriteStream(path.join(__dirname, 'express.log'), { flags: 'a' })
    app.use(logger({ stream: stream }))
} else {
    app.use(logger('dev'))
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(sassMiddleware({
    src: path.join(__dirname, '..', 'public'),
    dest: path.join(__dirname, '..', 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
}))
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(express.static(path.join(__dirname, '..', 'dist')))
app.use(expressSession({
    secret: 'THE SECRET MUST BE CHANGED EVERY YEAR',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

restify.defaults({
    onError (err, req, res, next) {
        const statusCode = req.erm.statusCode
        res.status(statusCode).json({
            message: err.message
        })
        console.log(req)
    }

})
restify.serve(router, Thing)
router.use(index)
app.use(router)

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
