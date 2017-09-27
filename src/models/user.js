import Mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const Schema = Mongoose.Schema
const User = new Schema({
    'username': String,
    'password': String
})

User.plugin(passportLocalMongoose)

export default Mongoose.model('user', User)
