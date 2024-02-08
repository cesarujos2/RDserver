import { Router } from "express";
import { getDataRD } from "../controllers/rd";

const router = Router()

router.post('/api', getDataRD)

export { router };
