/*eslint no-console:0*/
import express from 'express'
import path from 'path'
import logger from 'morgan'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import sassMiddleware from 'node-sass-middleware'
import restify from 'express-restify-mongoose'

import index from './routes/index'

import thing from './models/thing'

const app = express()
const router = express.Router()

mongoose.connect('mongodb://localhost:27017/database')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
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

restify.serve(router, thing)
router.use(index)
app.use(router)

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

console.log('OK')
module.exports = app
