import mongoose, { Schema, model, models } from "mongoose";

const extraPriceSchema = new Schema({
  name: String,
  price: Number,
});

const MenuItemSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    category: {type: mongoose.Types.ObjectId},
    price: { type: Number },
    sizes: {type:[extraPriceSchema]},
    extraIngredientPrices: {type:[extraPriceSchema]},
  },
  { timestamps: true }
);

// Use the correct case for the model name
export const MenuItems = models?.MenuItem || model('MenuItem', MenuItemSchema);
