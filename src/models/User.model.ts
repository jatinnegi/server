import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePictur: {
      type: String,
      required: false,
      default:
        "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg",
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    state: { type: String, required: false },
    city: { type: String, required: false },
    address: { type: String, required: false },
    zipCode: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const hashedPassword = bcrypt.hashSync(this.password, 10);
  this.password = hashedPassword;
  next();
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
