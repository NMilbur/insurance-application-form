import express from "express";

const router = express.Router();

router.get("/application");
router.get("/application/:applicationId");

router.post("/application");
router.put("/application/:applicationId");

router.post("/application/:applicationId/quote");

export default router;
