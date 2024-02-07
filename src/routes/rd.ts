import { Router } from "express";
import { getDataRD } from "../controllers/rd";

const router = Router()

router.get('/api', getDataRD)

export { router };
