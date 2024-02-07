export interface requestRD {
    document_name?: string,
    subcategory_id?: "aprobado" | "desaprobado" | "improcedente",
    director?: string,
    administrado?: string,
    link_rd_c?: string,
    name?: string,
    active_data?: string,
    tipo_iga_c?: string
}