

import { Hono } from "hono";

import { createUser,getUsers } from "../controller/userController";


const userRoutes = new Hono();


userRoutes.get("/get", getUsers);
userRoutes.post("/post", createUser);


export default userRoutes;