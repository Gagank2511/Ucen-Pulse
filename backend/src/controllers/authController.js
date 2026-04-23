import prisma from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(userDetails) {
  const hashedPassword = await bcrypt.hash(userDetails.password, 10);

  const user = await prisma.user.create({
    data: {
      name: userDetails.name,
      email: userDetails.email,
      password: hashedPassword,
    },
  });


  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, user: { name: user.name, email: user.email } }; 
}

export async function login(email, password) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, user: { name: user.name, email: user.email } });
}