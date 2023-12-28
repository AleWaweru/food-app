import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
    userEmail: String,
    phone: String,
    address: String,
    postal: String,
    city: String,
    country: String,
    cartProducts: Object,
    paid: {type: Boolean, default: false},
}, {timestamps: true});

export const Order = models?.Order || model('Order', OrderSchema);