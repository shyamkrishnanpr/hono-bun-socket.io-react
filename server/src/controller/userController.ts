import { User, userSchemaValidation } from "../models/users";
import type { Context } from "hono";
import { io } from "../startup/socket";
import { sendResponse } from "../utils/baseResponce";

// get all users
export const getUsers = async (c: Context) => {
	try {
		const users = await User.find();
		return sendResponse(c, true, "", 200, users);
	} catch (error) {
		return sendResponse(c, false, "Internal server error", 500, []);
	}
};

// create a new user
export const createUser = async (c: Context) => {
	try {
		const parseddata = await c.req.json();
		const user = new User(parseddata);
		await user.save();
		io.emit("userCreated", { message: "user created", user });
		return sendResponse(c, true, "", 200, [user]);
	} catch (error) {
		if (error instanceof Error) {
			return sendResponse(c, false, error.message, 500, []);
		}
		return sendResponse(c, false, "Internal server error", 500, []);
	}
};
