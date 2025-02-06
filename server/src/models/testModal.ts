
import mongoose from "mongoose";
import { z } from "zod";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);



export const userSchemaValidation  = z.object({
  name: z.string().min(3,"Name must be at least 3 characters long").max(20),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6,"Password must be at least 6 characters long").max(20),
})






















  
  // Zod schema for User
  // export const userSchema = z.object({
  //   name: z
  //     .string({
  //       required_error: "Name is required",
  //     })
  //     .min(3)
  //     .max(50),
    // email: z
    //   .string({
    //     required_error: "Email is required",
    //   })
    //   .email("Please enter a valid email address.")
    //   .max(255),
    // password: z
    //   .string({
    //     required_error: "Password is required",
    //   })
    //   .min(6)
    //   .max(255),
    // role: z.enum(["admin", "user"]).default("user"),
    // isActive: z.boolean().default(true),
    // invalid: z.boolean().optional(),
  // });
  
  // export const authUserSchema = userSchema.pick({ email: true, password: true });
  
  // export const updateUserSchema = userSchema.pick({
  //   name: true,
  //   email: true,
  //   isActive: true,
  //   role: true,
  // });
  
  // export const resetPasswordSchema = z.object({
  //   authPassword: z.string().min(6).max(255),
  //   newPassword: z.string().min(6).max(255),
  // });
  
  // MongoDB document interface for User
  // interface User extends Document {
  //   name: string;
  //   email: string;
  //   password: string;
  //   role: string;
  //   createdBy: ObjectId;
  //   updatedBy: ObjectId;
  //   isActive: boolean;
  //   invalid: boolean;
  //   generateAuthToken: () => string;
  // }
  
  // // Mongoose schema for User
  // const userMongooseSchema = new Schema<User>(
  //   {
  //     name: {
  //       type: String,
  //       required: true,
  //       trim: true,
  //       minLength: 3,
  //       maxlength: 50,
  //     },
  //     email: {
  //       type: String,
  //       required: true,
  //       unique: true,
  //       minLength: 5,
  //       maxlength: 255,
  //       trim: true,
  //     },
  //     password: {
  //       type: String,
  //       required: true,
  //       minLength: 6,
  //       maxlength: 1024,
  //     },
  //     isActive: {
  //       type: Boolean,
  //       default: true,
  //     },
  //     role: {
  //       type: String,
  //       enum: ["admin", "user"],
  //       default: "user",
  //     },
  //     createdBy: {
  //       type: Schema.Types.ObjectId,
  //       ref: "User",
  //       required: true,
  //     },
  //     updatedBy: {
  //       type: Schema.Types.ObjectId,
  //       ref: "User",
  //     },
  //     invalid: {
  //       type: Boolean,
  //     },
  //   },
  //   {
  //     timestamps: true,
  //   },
  // );
  
  // // User model
  // const User = model<User>("User", userMongooseSchema);

  // export const responseSchema = z.object({
  //   name: z.string(),
  //   email: z.string(),
  //   role: z.string(),
  //   isActive: z.boolean(),
  //   invalid: z.boolean().optional(),
  // });
  
  // export default User;
  