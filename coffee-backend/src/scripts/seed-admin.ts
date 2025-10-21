import { connect, model } from "mongoose";
import * as bcrypt from "bcrypt";
import { UserSchema } from "../modules/users/users.schema";
import { config } from "dotenv"; 
config();

async function seedAdmin() {
  await connect(process.env.MONGO_URI || "");
  const User = model("User", UserSchema);

  const passwordHash = await bcrypt.hash("200406", 10);

  await User.create({
    email: "manhmanh@gmail.com",
    passwordHash,
    fullName: "Admin Mạnh",
    phoneNumber: "0345552262",
    address: "Điệp's Dream HQ",
    role: "admin",
  });

  console.log("Admin created successfully with password 200406");
  process.exit(0);
}

seedAdmin();
