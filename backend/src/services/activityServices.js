import { createNewActivity, deleteActivityById, getAllActivities } from "../controllers/activityController.js";

export async function createActivity(req, res) {
    const { date, type, duration, notes } = req.body;

    const newActivity = await createNewActivity({
        date: new Date(date),
        type,
        duration,
        notes,
        userId: req.user.userId,
    })
    
    res.status(201).json(newActivity);
}

export async function getActivities(req, res) {
    const userId = req.user.userId;

    try {
        const activities = await getAllActivities(userId);
        res.json(activities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function deleteActivity(req, res) {
    try {
        const { id } = req.params;
        await deleteActivityById(id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}