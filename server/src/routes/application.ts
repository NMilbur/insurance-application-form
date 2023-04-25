import express from "express";
import { createApplication, getApplication } from "../controllers/application";

const router = express.Router();

router.get("/application/:applicationRef", getApplication);

router.post("/application", createApplication);
router.put("/application/:applicationId");

router.post("/application/quote");

export default router;
