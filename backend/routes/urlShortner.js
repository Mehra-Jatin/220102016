import express from "express";
import { createShortUrl, getClicks } from "../controllers/urlControllers.js";
const router = express.Router();


router.post('/', createShortUrl);
router.get('/:code', getClicks);

export default router;
