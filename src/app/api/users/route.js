import mongoose from "mongoose";
import User from "../../models/User";

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);

  try {
    const users = await User.find().exec(); // Wait for the execution of the query
    return Response.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
