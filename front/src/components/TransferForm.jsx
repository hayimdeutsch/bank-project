import { useState } from "react";
import submitForm from "../utils/submitForm";
import useAxiosProtected from "../hooks/useAxiosProtected";

import { Box, TextField, Button } from "@mui/material";

export default function TransferForm({ setRefresh }) {
  let axiosInstance = useAxiosProtected();
  let [to, setTo] = useState("");
  let [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    try {
      let res = await submitForm(e, "/api/v1/user/transactions", axiosInstance);
      setRefresh((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        alignContent: "center",
        maxWidth: 360,
        borderRadius: 3,
        border: 1,
        padding: 1,
        backgroundColor: "background.paper",
      }}
    >
      <h3>Transfer Form</h3>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Send To"
          type="email"
          id="to"
          name="to"
          size="small"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Amount"
          id="amount"
          name="amount"
          type="number"
          size="small"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          required
        />

        <Button type="submit" fullWidth variant="contained" color="primary">
          Send
        </Button>
      </form>
    </Box>
  );
}
