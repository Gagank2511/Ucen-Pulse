import prisma from "../config/db.js";

// CREATE
export async function createNewActivity(data) {
  const newActivity = await prisma.activity.create({
    data: data,
  });

  return newActivity;
}

// GET ALL
export async function getAllActivities(userId) {
  const activities = await prisma.activity.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });

  return activities;
}

// DELETE
export async function deleteActivityById(id) {
  await prisma.activity.delete({
    where: { id: Number(id) },
  });
}