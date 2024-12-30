import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const businessSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	category: { type: String, required: true },
	owner: { type: Types.ObjectId, ref: "User", required: true },
	subscribers: [{ type: Types.ObjectId, ref: "User" }],
	reviews: [
		{
			userId: { type: Types.ObjectId, ref: "User" },
			comment: { type: String, required: true },
			rating: { type: Number, required: true, min: 1, max: 5 },
			createdAt: { type: Date, default: Date.now },
		},
	],
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});
export default mongoose.model("Business", businessSchema);
