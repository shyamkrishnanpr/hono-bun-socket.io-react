import { Hono } from "hono";
import { createUser, getUsers } from "../controller/userController";
import { validateRequest } from "../middleware/zodValidationMiddleware";
import { userSchemaValidation } from "../models/users";

const userRoutes = new Hono();

userRoutes.get("/", getUsers);
userRoutes.post("/", validateRequest(userSchemaValidation), createUser);

export default userRoutes;
