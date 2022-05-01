import { model, Schema } from 'mongoose';

export default model(
	'user',
	new Schema({
		id: {type: String},
		registeredAt: { type: Number, default: Date.now() },
		reputation: { type: Number, default: 0 },
	})
);
