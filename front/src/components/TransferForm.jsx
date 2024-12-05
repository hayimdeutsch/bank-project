import { useState } from "react";
import submitForm from "../utils/submitForm";
import useAxiosProtected from "../hooks/useAxiosProtected";

import { Box, TextField, Button, Typography } from "@mui/material";

export default function TransferForm({ setRefresh }) {
  const privateAxios = useAxiosProtected();
  const [error, setError] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    try {
      let res = await submitForm(e, "/api/v1/user/transactions", privateAxios);
      if (res.status === 200) {
        setRefresh((prev) => prev + 1);
        setTo("");
        setAmount("");
      }
    } catch (err) {
      if (err.status === 422) {
        setError("Recipient must be input as Email!");
      } else if (err.status === 400) {
        setError(err.response.data.message);
      }
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        alignContent: "center",
        borderRadius: 3,
        border: 1,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.paper",
      }}
    >
      <Typography
        sx={{ alignSelf: "center", mb: 2, fontWeight: "bold" }}
        variant="h5"
      >
        Transfer Form
      </Typography>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
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
          onChange={(e) => {
            setError("");
            setTo(e.target.value);
          }}
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
          onChange={(e) => {
            setError("");
            setAmount(e.target.value);
          }}
          fullWidth
          required
        />
        {error ? (
          <Button type="submit" fullWidth variant="contained" color="secondary">
            {error}
          </Button>
        ) : (
          <Button type="submit" fullWidth variant="contained" color="primary">
            Send
          </Button>
        )}
      </form>
    </Box>
  );
}
