import { createNewMetric, geAllMetrics, deleteMetric } from "../controllers/metricController";

export async function getMetrics(req, res) {
    try{
        const {userId} = req.user.userId;

        const metrics = await geAllMetrics(userId);
    
        res.status(200).json(metrics);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

export async function createMetric(req, res) {
    const { date, metric, value } = req.body;
    const { userId } = req.user.userId;
    
    try{
        const newMetric = await createNewMetric(date, metric, value, userId);
      
        res.status(200).json(newMetric);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

export async function deleteMetric(req, res) {
    const { id } = req.params;

    try{
        await deleteMetricById(id);
        res.status(200).json({ message: "Metric deleted successfully" });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }

}