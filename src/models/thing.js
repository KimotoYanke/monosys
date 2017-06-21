import Mongoose from 'mongoose'

export default Mongoose.model('thing', new Mongoose.Schema({
	'name': { type: String, required: true },
	'rfid': { type: String },
	'isbn': { type: String },
	'budget_frame': { type: String, required: true },
	'where': { type: String, required: true },
	'whose': { type: String },
	'date': { type: Date, required: true, default: Date.now },
	'loan': { type: Mongoose.Schema.Types.ObjectId },
	'tags': { type: [String] },
	'comment': { type: String }
}))
