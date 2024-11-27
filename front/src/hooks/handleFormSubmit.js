const handleFormSubmit = async (event, endpoint) => {
  event.preventDefault();
  let form = Object.fromEntries(new FormData(event.target).entries());

  let headers = {'content-type': 'application/json'};
  const token = sessionStorage.getItem('accessToken');
  if (token) {
    headers.Authorization = "Bearer " + token;
  }
  try {
    let res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(form),
    });
    let msg = await res.json();
    if (res.ok) {
      return msg;
    } else {
      throw new Error(res.status, msg)
    }
  } catch (err) {
    throw new Error("network error")
  }
}

export default handleFormSubmit;