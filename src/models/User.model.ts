import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture: string;
  phoneNumber: string;
  countryCode: string;
  state: string;
  city: string;
  address: string;
  zipCode: string;
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
      default: "",
    },
    countryCode: {
      type: String,
      required: false,
      default: "US",
    },
    state: { type: String, required: false, default: "" },
    city: { type: String, required: false, default: "" },
    address: { type: String, required: false, default: "" },
    zipCode: { type: String, required: false, default: "" },
  },
  {
    timestamps: true,
  }
);

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
  const user = this;

  if (!user.isNew || !user.isModified("password")) {
    return next();
  }

  const hashedPassword = bcrypt.hashSync(user.password, 10);
  user.password = hashedPassword;
  next();
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
