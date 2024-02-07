import 'dotenv/config'

async function tefiRequest(method: string, args: {}) {
    let URL_TEFI = String(process.env.URL_API_TEFI)
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
        const data = await response.json()
        return data
    } catch (e) {
        console.error(e)
    }
}

export { tefiRequest }