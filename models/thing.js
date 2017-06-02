import { Schema, model } from 'mongoose'

export default model('thing', new Schema({
	'name': { type: String, required: true },
	'rfid': { type: String },
	'isbn': { type: String },
	'budget_frame': { type: String, enum: ['admin', '*'], required: true },
	'where': { type: String, required: true },
	'borrowing': { type: Schema.Types.ObjectId },
	'tags': { type: [String] },
	'comment': { type: String }
}))
