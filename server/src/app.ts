import express from "express";
import applicationRoutes from "./routes/application";

const app = express();
const PORT = process.env.PORT || 4000;

const CURRENT_API_PREFIX = "/api/v1";

app.use(`${CURRENT_API_PREFIX}`, applicationRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
