import { Schema, model, models } from "mongoose";

const MenuItemSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    price: { type: Number },
  },
  { timestamps: true }
);

// Use the correct case for the model name
export const MenuItems = models?.MenuItem || model('MenuItem', MenuItemSchema);
