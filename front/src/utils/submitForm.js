export default async function submitForm(e, endpoint, axiosInstance) {
  e.preventDefault();
  let data = Object.fromEntries(new FormData(e.target).entries());
  let response = await axiosInstance.post(endpoint, data, { headers: 
    {'Content-Type': 'application/json' }
  });
  return response;
}

