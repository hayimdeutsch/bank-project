export default function TransferForm() {
  let [formData, setFormData] = useState({
    to: '',
    amount: ''
  });

  const handleChange = (event) => {
    let {name, value} = event.target;
    setFormData((prevState) => ({...prevState, [name]: value}))
  }

  const handleSubmit = async (event) => {
    try {
      let res = await handleFormSubmit(event, submitTo);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div className="TransferForm">
    <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="to" name="to" value={formData.to} onChange={handleChange} required />

        <label htmlFor="password">Password:</label>
        <input type="" id="password" name="password" value={formData.password} onChange={handleChange} required />

        <button type="submit">Send</button>
    </form>
  </div>
  )
}