import prisma from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  const { userDetails } = req.body;

  try {
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

    res.status(201).json({
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    res.status(400).json({ message: "User already exists" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
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