import { Response } from "express"

const handleHttps = (res: Response, error: string) => {
    res.status(500)
    res.send({ error: error})
}

export { handleHttps }