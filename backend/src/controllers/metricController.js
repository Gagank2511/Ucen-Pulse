import prisma from "../config/db.js";

export async function geAllMetrics(userId) {
  const metrics = await prisma.metric.findMany({
    where: { userId: userId },
    orderBy: { date: "desc" },
  });
    
  return metrics;
}

export async function createNewMetric(date, metric, value, userId) {
  const newMetric = await prisma.metric.create({
    data: {
      date: new Date(date),
      metric,
      value: parseFloat(value),
      userId: userId,
    },
  });

  return newMetric;
}

export async function deleteMetricById(id) {
  await prisma.metric.delete({
    where: { id: Number(id) },
  });

  return { message: "Deleted" };
}