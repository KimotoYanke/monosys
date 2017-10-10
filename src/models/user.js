import Mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const Schema = Mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const User = new Schema({
    'username': String,
    'password': String,
    'loan': [{ type: ObjectId, ref: 'loan' }]
})

User.plugin(passportLocalMongoose)

export default Mongoose.model('user', User)
