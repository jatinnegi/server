import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  address: string;
  zipCode: string;
  generateAuthToken: () => string;
  comparePassword: (password: string) => boolean;
}

const UserSchema = new mongoose.Schema<UserDocument>(
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
    profilePicture: {
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

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });

  return token;
};

UserSchema.methods.comparePassword = function (password: string) {
  const hashedPassword = this.password;
  const match = bcrypt.compareSync(password, hashedPassword);

  return match;
};

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

UserSchema.pre("save", async function (next) {
  const hashedPassword = bcrypt.hashSync(this.password, 10);
  this.password = hashedPassword;
  next();
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
