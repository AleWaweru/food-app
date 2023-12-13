import { model, models, Schema } from "mongoose";

const UserInfoSchema = new Schema({
    email: { type: String, required: true, unique: true },   
    phone: {type: String},
    city: {type: String},
    address: {type: String},
    postal: {type: String},
    country: {type: String},
    admin: {type: Boolean, default: false},
}, { timestamps: true });


const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema);
export default UserInfo;
