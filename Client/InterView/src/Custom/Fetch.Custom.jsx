async function FetchCustom(params) {
    console.log("params", params.url);
    const token = localStorage.getItem("token")
    const res = await fetch(params.url, {
        method: params.method,
        body: JSON.stringify(params.body)??{},
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Authorization': 'Bearer ' + token
        },
        credentials: 'include',
    });

    return res.json();
}

export { FetchCustom }