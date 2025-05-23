import mongoose from "mongoose";
import { z } from "zod";

export const robotSchemaValidation = z.object({
	manufacturer: z.string().min(3).max(20),
	serialNumber: z.string().min(3).max(20),
});

export interface IRobot extends mongoose.Document {
	manufacturer: string;
	serialNumber: string;
}

const robotMongooseSchema = new mongoose.Schema<IRobot>(
	{
		manufacturer: { type: String, required: true },
		serialNumber: { type: String, required: true, unique: true},
	},
	{ timestamps: true },
);

export const Robot = mongoose.model<IRobot>("Robot", robotMongooseSchema);
