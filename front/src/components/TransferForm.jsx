import { useState } from 'react';

import submitForm from '../utils/submitForm'
import useAxiosProtected from '../hooks/useAxiosProtected';

import {
  Box,
  FormGroup,
  FormControl,
  FormLabel,
  TextField,
  Button
} from '@mui/material'

export default function TransferForm() {
  let axiosInstance = useAxiosProtected();
  let [formData, setFormData] = useState({
    to: '',
    amount: ''
  });

  const handleChange = (event) => {
    let {name, value} = event.target;
    setFormData((prevState) => ({...prevState, [name]: value}))
  }

  const handleSubmit = async (e) => {
    try {
      let res = await submitForm(e, "/api/v1/user/transactions", axiosInstance);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 360, borderRadius: 3, border: 1, padding: 1 }}>
      <h3>Transfer Form</h3>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormControl>
            <FormLabel htmlFor="email">
              Send To:
            </FormLabel>
            <TextField 
              type="email"
              id="email" 
              name="email"
              value={formData.to} 
              onChange={handleChange} 
              fullWidth
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="amount">
              Amount
            </FormLabel>
            <TextField 
              id="amount" 
              name="amount"
              type="number"
              value={formData.amount} 
              onChange={handleChange} 
              fullWidth
              required
            />
          </FormControl>
      </FormGroup>

      <Button type="submit" fullWidth variant="contained" color="secondary">Send</Button>
    </form>
  </Box>
  )
}
