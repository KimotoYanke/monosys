import Mongoose from 'mongoose'

export default Mongoose.model('thing', new Mongoose.Schema({
	'name': { type: String, required: true },
	'rfid': { type: String },
	'isbn': { type: String },
	'budget_frame': { type: String, enum: ['admin', '*'], required: true },
	'where': { type: String, required: true },
	'borrowing': { type: Mongoose.Schema.Types.ObjectId },
	'tags': { type: [String] },
	'comment': { type: String }
}))
