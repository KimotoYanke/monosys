import Mongoose from 'mongoose'

const Schema = Mongoose.Schema
const ObjectId = Schema.ObjectId

export default Mongoose.model('thing', new Schema({
    'name': { type: String, required: true },
    'rfid': { type: String },
    'isbn': { type: String },
    'budget_frame': { type: String, required: true },
    'where': { type: String, required: true },
    'whose': { type: String },
    'date': { type: Date, required: true, default: Date.now },
    'loan': { type: ObjectId, ref: 'loan' },
    'tags': { type: [String] },
    'comment': { type: String }
}))
