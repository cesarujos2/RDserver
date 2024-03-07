import "dotenv/config";

async function tefiRequest(method: string, args: {}) {
  let URL_TEFI = String(process.env.URL_API_TEFI);
  let body = {
    method: "POST",
    body: new URLSearchParams({
      method: method,
      input_type: "JSON",
      response_type: "JSON",
      rest_data: JSON.stringify(args),
    }),
  };
  try {
    const response = await fetch(URL_TEFI, body);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}

function formatterDataTefi(data: any) {
  let entryList: Array<{}> = [];
  data["entry_list"].forEach((element: any, index: any) => {
    let claveRelationShip = Object.keys(
      data["relationship_list"][index]["link_list"][0]["records"][0][
        "link_value"
      ]
    );
    let claves = Object.keys(element["name_value_list"]);
    let dataForm: any = {};
    for (let i = 0; i < claves.length; i++) {
      dataForm[claves[i]] = element["name_value_list"][claves[i]].value;
    }
    for (let i = 0; i < claveRelationShip.length; i++) {
      dataForm[claveRelationShip[i]] =
        data["relationship_list"][index]["link_list"][0]["records"][0][
          "link_value"
        ][claveRelationShip[i]].value;
    }
    entryList.push(dataForm);
  });
  delete data.entry_list;
  delete data.relationship_list;
  data.entry_list = entryList;
  return data;
}

export { tefiRequest, formatterDataTefi };
