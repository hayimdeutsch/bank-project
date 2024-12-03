import { useEffect, useState } from "react";
import useProtectedFetch from "../hooks/useProtectedFetch";
import formatCurrency from "../utils/formatCurrency";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, Box, Typography } from "@mui/material";
import useAxiosProtected from "../hooks/useAxiosProtected";
import submitForm from "../utils/submitForm";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [sendingError, setSendingError] = useState(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [refresh, setRefresh] = useState(0);
  let privateAxios = useAxiosProtected();

  let { loading, error, data } = useProtectedFetch(
    "api/v1/admin/users",
    refresh
  );

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    if (!selectedUserEmail || !depositAmount) {
      setSendingError("Need to input email and amount");
      return;
    }

    try {
      let response = await submitForm(e, "api/v1/admin/deposits", privateAxios);
      setSelectedUserEmail("");
      setDepositAmount("");
      setRefresh((prev) => prev + 1);
      alert("Deposit successful!");
    } catch (error) {
      if (error?.response && error.response?.status === 400) {
        setSendingError("User email or amount are incorrect");
      } else {
        setDepositAmount("");
        setSelectedUserEmail("");
        alert("Deposit failed");
      }
    }
  };

  const handleSelectionChange = (selectionModel) => {
    const selectedUser = rows.find((user) => {
      return user.id === selectionModel[0];
    });
    setSelectedUserEmail(selectedUser ? selectedUser.email : "");
  };

  const columns = [
    {
      field: "firstName",
      headerName: "First Name",
      headerAlign: "center",
      editable: false,
      resizable: false,
      flex: 0.2,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      headerAlign: "center",
      editable: false,
      resizable: false,
      flex: 0.2,
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      type: "email",
      editable: false,
      resizable: false,
      flex: 0.25,
    },
    {
      field: "phone",
      headerName: "Phone",
      headerAlign: "center",
      editable: false,
      sortable: false,
      resizable: false,
      flex: 0.15,
    },
    {
      field: "balance",
      headerName: "Balance",
      headerAlign: "center",
      type: "number",
      sortable: true,
      resizable: false,
      flex: 0.15,
      valueGetter: (balance) => formatCurrency(balance),
    },
  ];

  let rows = users.map((user, index) => ({
    id: index + 1,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    balance: user.balance,
  }));

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography variant="h3" pt={2}>
        Admin Panel
      </Typography>
      <Box
        sx={{
          my: 5,
        }}
      >
        <form
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            label="User Email"
            id="user"
            name="user"
            type="email"
            size="small"
            value={selectedUserEmail}
            onChange={(e) => setSelectedUserEmail(e.target.value)}
          />
          <TextField
            label="Deposit Amount"
            id="amount"
            name="amount"
            type="number"
            size="small"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Register Deposit
          </Button>
        </form>
      </Box>
      <Box
        sx={{
          width: "80%",
          backgroundColor: "background.paper",
          height: 400,
          mb: 3,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          onRowSelectionModelChange={handleSelectionChange}
          rowSelectionModel={rowSelectionModel}
        />
      </Box>
    </Box>
  );
}
