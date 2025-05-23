import mongoose from "mongoose";
// import { z } from "zod";
import { z } from "@hono/zod-openapi";
export interface IUser extends mongoose.Document {
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ timestamps: true },
);

// zod schema for user data
export const userSchemaValidation = z
	.object({
		name: z.string().min(3, "Name must be at least 3 characters long").max(20),
		email: z.string().email("Please enter a valid email address."),
		password: z
			.string()
			.min(6, "Password must be at least 6 characters long")
			.max(20),
	})
	.openapi("CreateUser");

// Response schema for user data
export const ResponseUserSchema = z
	.object({
		id: z.string().openapi({}),
		email: z.string().email().openapi({}),
		name: z.string().openapi({}),
		createdAt: z.string().datetime().openapi({}),
	})
	.openapi("UserResponse");

// Schema for path parameters
export const UserIdSchema = z
	.object({
		id: z
			.string()
			.min(1)
			.openapi({
				param: {
					name: "id",
					in: "path",
				},
			}),
	})
	.openapi("UserId");

//error response schema
export const ErrorResponseSchema = z
	.object({
		error: z.string().openapi({}),
	})
	.openapi("ErrorResponse");

export const User = mongoose.model<IUser>("User", userSchema);
