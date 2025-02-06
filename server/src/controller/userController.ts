
import { User, userSchemaValidation } from "../models/testModal";

import { io } from "../index";

// get all users

export const getUsers = async (c: any) => {
    try {
        const users = await User.find();
        return c.json(users, 200);
    } catch (error) {
        console.log(error);
    }
}

// create a new user
export const createUser = async (c: any) => {
    try {
        const data = await c.req.json();
        const parseddata = userSchemaValidation.parse(data);
        const user = new User(parseddata);
        await user.save();
        io.emit("userCreated", { message: "New user created", user });
        return c.json(user, 201);

    } catch (error) {
        console.log(error);
    }
}