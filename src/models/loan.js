import Mongoose from 'mongoose'

const Schema = Mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export default Mongoose.model('loan', new Schema({
    'thing': { type: ObjectId, ref: 'thing' },
    'user': { type: ObjectId, ref: 'user' }
}))
