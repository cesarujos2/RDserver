const createQuery = (body: any) => {
  const filter = Object.entries(body)
    .filter(([_clave, valor]) => {
      // filtrar si el valor es vacío o si es un objeto con todos sus atributos vacíos
      return (
        valor !== "" &&
        !(
          typeof valor === "object" &&
          Object.values(valor ?? {}).every((v) => v === "")
        )
      );
    })
    .map(([clave, valor]) => {
      if (clave === "document_name") {
        return `${clave} LIKE "%${valor}%"`
      } else if (clave === "active_date") {
        const valorAny = valor as any;
        // Tratar el rango de fechas como un BETWEEN en SQL
        let sqlActiveDate = "";
        if (
          valorAny["active_date_inicial"] == "" &&
          valorAny["active_date_final"] !== ""
        ) {
          sqlActiveDate = `${clave} <= '${valorAny["active_date_final"]}'`;
        }
        if (
          valorAny["active_date_inicial"] !== "" &&
          valorAny["active_date_final"] == ""
        ) {
          sqlActiveDate = `${clave} >= '${valorAny["active_date_inicial"]}'`;
        }
        if (
          valorAny["active_date_inicial"] !== "" &&
          valorAny["active_date_final"] !== ""
        ) {
          sqlActiveDate = `${clave} BETWEEN '${valorAny["active_date_inicial"]}' AND '${valorAny["active_date_final"]}'`;
        }
        return sqlActiveDate;
      } else {
        return `${clave} = "${valor}"`;
      }
    })
    .join(" AND ");
  return filter;
};

export default createQuery;
