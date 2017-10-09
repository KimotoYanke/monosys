import Mongoose from 'mongoose'
const Schema = Mongoose.Schema
const ObjectId = Schema.ObjectId

export default Mongoose.model('loan', new Mongoose.Schema({
    'thing': { type: ObjectId, ref: 'thing' },
    'user': { type: ObjectId, ref: 'user' }
}))
