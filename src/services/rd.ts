import { tefiRequest } from "../config/tefi"
import 'dotenv/config'

const findDataRD = async (body: {}, query: any) => {
    try {
        const loginResponseTefi = await tefiRequest('login', {
            user_auth: {
                user_name: process.env.USER_TEFI,
                password: process.env.PASS_TEFI,
            },
            application_name: "My SuiteCRM REST Client",
            name_value_list: {},
        })
        //OBTENER SECUENCIA SQL PARA FILTRAR EN API
        const filter = Object.entries(body)
            .filter(([_clave, valor]) => valor !== "")
            .map(([clave, valor]) => {
                if (clave === "active_date") {
                    const valorAny = valor as any;
                    // Tratar el rango de fechas como un BETWEEN en SQL
                    return `${clave} BETWEEN '${valorAny["active_date_inicial"]}' AND '${valorAny["active_date_final"]}'`;
                } else {
                    return `${clave} = "${valor}"`;
                }
            })
            .join(" AND ");
        const dataRD = await tefiRequest("get_entry_list", {
            session: loginResponseTefi['id'],
            module_name: "RSD_R_directorales",
            query: filter,
            order_by: "",
            offset: Number(query["page"]) * Number(query["max_results"]) || 0,
            select_fields: ["document_name", "subcategory_id", "director", "administrado", "link_rd_c", "active_date"],
            link_name_to_fields_array: [{
                "name": "rsd_r_directorales_iga_igas",
                "value": ["name", "tipo_iga_c"]
            }],
            max_results: Number(query["max_results"]) || 15,
            deleted: 0
        })
        return dataRD
    } catch (e) {
        console.error("No conecta a Tefi")
    }
}

export { findDataRD }
