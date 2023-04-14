async function FetchCustom(params) {
    const token = localStorage.getItem("token");
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Credentials': 'true'
    };
  
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  
    const res = await fetch(params.url, {
      method: params.method,
      body: JSON.stringify(params.body),
      headers,
      credentials: 'include'
    });
  
    return res.json();
  }
  
  export { FetchCustom };
  