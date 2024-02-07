import { Router } from "express";

const router = Router()

router.get('/api', (_req, resp)=>{
    resp.send({id: "hola"})
})

export { router };
