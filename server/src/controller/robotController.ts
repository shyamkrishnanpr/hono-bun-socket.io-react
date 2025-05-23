import { Robot, robotSchemaValidation } from "../models/robots";
import type { Context } from "hono";
import { io } from "../startup/socket";
import mongoose from "mongoose";
import transactionOptions from "../services/transactionOption";
import { HTTPException } from "hono/http-exception";
import { sendResponse } from "../utils/baseResponce";

// get all robots
export const getRobots = async (c: Context) => {
	try {
		const robots = await Robot.find();
		return sendResponse(c, true, "", 200, robots);
	} catch (e) {
		return sendResponse(c, false, "Internal server error", 500, []);
	}
};

// create robot

export const createRobot = async (c: Context) => {
	const data = await c.req.json();
	const session = await mongoose.startSession();

	try {
		const transactionResults = await session.withTransaction(async () => {
			const robot = new Robot(data);
			await robot.save({ session });

			// Get fleet from context
			// const fleet = c.get("fleet");
			// if (!fleet.isConnected()) {
			// 	await session.abortTransaction();
			// 	return c.json({ error: "Fleet is not connected" }, 500);
			// }
			// const robotDetail = {};

			// // Add robot to fleet
			// await fleet.addRobot(robotDetail);
			io.emit("robotCreated", { message: "robot created", robot });

			return sendResponse(c, true, "", 200, [robot]);
		}, transactionOptions);

		return transactionResults;
	} catch (e) {
		if (e instanceof Error) {
					return sendResponse(c, false, e.message, 500, []);
				}
				return sendResponse(c, false, "Internal server error", 500, []);
	} finally {
		session.endSession();
	}
};
