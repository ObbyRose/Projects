import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, enum: ["user", "admin", "business"],  default:"user", required: true},
	plan: { type: String, enum: ["Standard", "Gold", "Platinum"], default: "Standard", required: true },
	savedBusinesses: [{ type: Schema.Types.ObjectId, ref: "Business" }],
});

const User = model("User", userSchema);
export default User;
