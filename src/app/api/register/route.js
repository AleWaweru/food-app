import User from "../../models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL);

  // Check if the password is provided and meets the length requirement
  const pass = body.password;
  if (!pass?.length || pass.length < 5) {
    throw new Error('Password must be at least 5 characters');
  }

  // Hash the password using bcrypt
  const notHashedPassword = pass;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(notHashedPassword, salt);

  // Create a new user with the hashed password
  const createdUser = await User.create(body);
  
  // Return the created user as JSON
  return Response.json(createdUser);
}
