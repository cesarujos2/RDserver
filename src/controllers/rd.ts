import { Request, Response } from "express"
import { handleHttps } from "../utils/error.handle";
import { findDataRD } from "../services/rd";

const getDataRD = async (req: Request, res: Response) => {
    try {
        const {body, query} = req
        const dataRD = await findDataRD(body, query)
        res.json(dataRD)
    } catch (e) {
        handleHttps(res, 'ERROR_GET_RD')
    }
};

export { getDataRD }