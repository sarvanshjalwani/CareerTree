// heatserver.js
import express from "express";
const router = express.Router();
export default function registerHeatmapRoutes(app, db, requireAuth) {
    router.get("/", requireAuth, (req, res) => {
        const query = `
      SELECT 
        DATE(completed_at) AS date,
        COUNT(*) AS count
      FROM user_progress
      WHERE completed = 1 AND user_id = ?
      GROUP BY DATE(completed_at)
      ORDER BY date;
    `;
        db.query(query, [req.userId], (err, results) => {
            if (err) {
                console.error("Error fetching heatmap data:", err);
                return res.status(500).json({ error: "Database query failed" });
            }
            res.json(results);
        });
    });
    app.use("/heatmap", router);
}
