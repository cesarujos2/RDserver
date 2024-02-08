import { Request, Response } from "express"
import { handleHttps } from "../utils/error.handle";
import { findDataRD } from "../services/rd";
import { formatterDataTefi } from "../config/tefi";

const getDataRD = async (req: Request, res: Response) => {
    try {
        const { body, query } = req
        if (Object.keys(body).length === 0) {
            throw new Error("No hay información")
        } else {
            const dataRD = await findDataRD(body, query)
            const formatedRD = formatterDataTefi(dataRD)
            res.json(formatedRD)
            //res.json(dataRD)
        }
    } catch (e) {
        handleHttps(res, 'ERROR_GET_RD: ' + e)
    }
};

export { getDataRD }