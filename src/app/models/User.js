import bcrypt from "bcrypt";
import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true,
        validate: {
            validator: pass => pass?.length && pass.length >= 5,
            message: 'Password must be at least 5 characters',
        },
    },
}, { timestamps: true });

UserSchema.post('validate', function (user) {
    const notHashedPassword = user.password;
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(notHashedPassword, salt);
})
const User = models?.User || model('User', UserSchema);

export default User;
