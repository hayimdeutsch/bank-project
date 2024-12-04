import { useEffect, useState } from "react";

import useProtectedFetch from "../hooks/useProtectedFetch";
import { useAuthContext } from "../context/UserContext";
import formatCurrency from "../utils/formatCurrency";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Stack } from "@mui/material";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

export default function ActivityTable({ refresh }) {
  const [transactions, setTransactions] = useState([]);
  let { activeUser } = useAuthContext();
  let { data: transactionData } = useProtectedFetch(
    "api/v1/user/transactions",
    refresh
  );
  let {
    loading: loadingBalance,
    error: balanceError,
    data: balance,
  } = useProtectedFetch("api/v1/user/balance", refresh);

  useEffect(() => {
    if (transactionData) {
      setTransactions(transactionData.transactions);
    }
  }, [transactionData]);

  const columns = [
    {
      field: "direction",
      headerName: "",
      flex: 0.05,
      editable: false,
      resizable: false,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {params.value ? (
            <ArrowDropUpRoundedIcon fontSize="large" color="success" />
          ) : (
            <ArrowDropDownRoundedIcon fontSize="large" color="error" />
          )}
        </Box>
      ),
    },
    {
      field: "type",
      headerName: "Transaction Type",
      headerAlign: "center",
      editable: false,
      resizable: false,
      flex: 0.1,
    },
    {
      field: "from/to",
      headerName: "From/To",
      headerAlign: "center",
      editable: false,
      resizable: false,
      flex: 0.2,
    },
    {
      field: "amount",
      headerName: "Amount",
      headerAlign: "center",
      editable: false,
      resizable: false,
      flex: 0.15,
      valueGetter: (amount) => formatCurrency(amount),
    },
    {
      field: "date",
      headerName: "Date",
      headerAlign: "center",
      resizable: false,
      flex: 0.2,
    },
    {
      field: "time",
      headerName: "Time",
      headerAlign: "center",
      resizable: false,
      flex: 0.1,
    },
  ];

  let rows = transactions.map((transaction, index) => {
    return formatTransaction({
      ...transaction,
      index: index + 1,
      user: activeUser.user,
    });
  });

  return (
    <Box
      width="100%"
      className="ActivityTable"
      sx={{
        mx: "auto",
        my: 3,
      }}
    >
      <Box
        sx={{
          py: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "85%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ my: 2 }} variant="h4">
            Transaction History
          </Typography>
          <Stack direction="row" spacing={3}>
            <h2>Balance</h2>
            {balance && <h2>{formatCurrency(balance.balance)}</h2>}
          </Stack>
        </Box>

        <Box
          sx={{
            width: "85%",
            height: "70vh",
            border: 1,
            backgroundColor: "background.paper",
            boxShadow: 3,
            borderRadius: 2,
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
            pageSizeOptions={[5, 10, 25, 50]}
          />
        </Box>
      </Box>
    </Box>
  );
}

function formatTransaction({ from, to, amount, time, user, index }) {
  let type = from == to ? "Deposit" : "Transfer";
  let isIncoming = to == user ? true : false;
  let transactionTiming = new Date(time);
  let other = type == "Deposit" ? "-" : isIncoming ? from : to;

  return {
    id: index,
    direction: isIncoming,
    type,
    "from/to": other,
    amount,
    date: transactionTiming.toDateString(),
    time: transactionTiming.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}
