import { MenuItems } from "../../models/MenuItems";
import mongoose from "mongoose";

export async function POST (req) {
    mongoose.connect(process.env.MONGO_URL)
    const data = await req.json();
    const menuItemDoc = await MenuItems.create(data);
    return Response.json(menuItemDoc);
}

export async function PUT (req) {
    mongoose.connect(process.env.MONGO_URL)
    const {_id, ...data} = await req.json();
    await MenuItems.findByIdAndUpdate(_id, data);
    return Response.json(true);
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    return Response.json(
        await MenuItems.find()
    );

}