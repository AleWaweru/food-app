import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import {authOption} from "../../api/auth/[...nextauth]/route";
import {UserInfo} from "../../models/UserInfo";
import {Order} from "../../models/Order";

export async function GET (req){
    mongoose.connect(process.env.MONGO_URL);
    const session = getServerSession(authOption);
    const userEmail = session?.user?.email;
    let isadmin = false;

    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");

    if(_id) {
        return Response.json(await Order.findById(_id));
    }

    if(userEmail) {
        const userInfo = await UserInfo.findOne({email:userEmail});
        if(userInfo) {
            isadmin = userInfo.admin;
        }
    }

    if (isadmin){
        return Response.json(await Order.find());
    }

    if(userEmail){
        return Response.json(await Order.find({userEmail}));
    }
}