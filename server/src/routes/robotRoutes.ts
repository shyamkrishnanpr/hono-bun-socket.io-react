import { Hono } from "hono";
import { createRobot, getRobots } from "../controller/robotController";
import { robotSchemaValidation } from "../models/robots";
import { validateRequest } from "../middleware/zodValidationMiddleware";

const robotRoutes = new Hono();

robotRoutes.get("/", getRobots);
robotRoutes.post("/", validateRequest(robotSchemaValidation), createRobot);

export default robotRoutes;
