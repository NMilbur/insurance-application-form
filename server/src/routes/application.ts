import express from "express";
import {
  createApplication,
  getApplication,
  getQuote,
  updateApplication,
} from "../controllers/application";

const router = express.Router();

router.get("/application/:applicationRef", getApplication);
router.post("/application", createApplication);
router.put("/application/:applicationRef", updateApplication);
router.post("/application/quote", getQuote);

export default router;
