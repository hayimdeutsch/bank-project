import { useEffect, useState } from "react";

import useProtectedFetch from "../hooks/useProtectedFetch";
import { useAuthContext } from "../context/UserContext";
import formatCurrency from "../utils/formatCurrency";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Stack } from "@mui/material";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

export default function ActivityTable({ refresh }) {
  const [transactions, setTransactions] = useState([]);
  const { activeUser } = useAuthContext();
  let { data } = useProtectedFetch("api/v1/user/transactions", refresh);

  useEffect(() => {
    if (data) {
      setTransactions(data.transactions);
    }
  }, [data]);

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
    <Box width={"100%"} className="ActivityTable">
      <Box
        sx={{
          py: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "background.default",
        }}
      >
        <h2>Transaction History</h2>
        <Box
          sx={{
            backgroundColor: "background.paper",
            boxShadow: 3,
            border: 1,
            borderRadius: 2,
            width: "90%",
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
