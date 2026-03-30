import prisma from "../config/db.js";

// CREATE
export async function createActivity(req, res) {
  const { date, type, duration, notes } = req.body;

  const newActivity = await prisma.activity.create({
    data: {
      date: new Date(date),
      type,
      duration,
      notes,
      userId: req.user.userId,
    },
  });

  res.json(newActivity);
}

// GET ALL
export async function getActivities(req, res) {
  try {
    const activities = await prisma.activity.findMany({
      where: { userId: req.user.userId },
      orderBy: { date: "desc" },
    });

    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// DELETE
export async function deleteActivity(req, res) {
  try {
    const { id } = req.params;

    await prisma.activity.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}