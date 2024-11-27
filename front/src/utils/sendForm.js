import axios from "./axios";

export default sendForm = async (e, endpoint) => {
  e.preventDefault();
  let data = Object.fromEntries(new FormData(e.target).entries());
  let response = await axios.post(endpoint, data, { headers: 
    {'Content-Type': 'application/json' }
  });
  return response;
}