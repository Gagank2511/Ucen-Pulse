import prisma from "../config/db.js";

export async function getMetrics(req, res) {
  try{
      const metrics = await prisma.metric.findMany({
        where: { userId: req.user.userId },
        orderBy: { date: "desc" },
      });
    
      res.json(metrics);
  }
  catch(err){
      res.status(500).json({ message: err.message });
  }
}

export async function createMetric(req, res) {
  const { date, metric, value } = req.body;

  try{
    console.log(parseFloat(metric));
      const newMetric = await prisma.metric.create({
        data: {
          date: new Date(date),
          metric,
          value: parseFloat(value),
          userId: req.user.userId,
        },
      });
    
      res.json(newMetric);
  }
    catch(err){
        res.status(500).json({ message: err.message });
    }

}

export async function deleteMetric(req, res) {
  const { id } = req.params;

  try{
      await prisma.metric.delete({
        where: { id: Number(id) },
      });
    
      res.json({ message: "Deleted" });
  }
  catch(err){
      res.status(500).json({ message: err.message });
  }

}