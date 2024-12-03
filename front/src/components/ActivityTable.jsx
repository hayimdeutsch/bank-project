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
  let { activeUser } = useAuthContext();
  let { loading, data, error } = useProtectedFetch(
    "api/v1/user/transactions",
    refresh
  );

  useEffect(() => {
    if (data) {
      console.log(data);
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
    <Box
      sx={{ alignContent: "center", justifyContent: "center" }}
      className="ActivityTable"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "background.default",
        }}
      >
        <h3>Transaction History</h3>
        <Balance refresh={refresh} />
        <Box
          sx={{
            width: "85%",
            height: "70vh",
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

function Balance({ refresh }) {
  let { loading, error, data } = useProtectedFetch(
    "api/v1/user/balance",
    refresh
  );
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Stack direction="row" spacing={6} justifyContent={"flex-end"}>
          <h4>Balance</h4>
          {data && <h4>{formatCurrency(data.balance)}</h4>}
          {/* { error && <p>{`Error - ${error?.msg}`}</p> } */}
        </Stack>
      )}
    </>
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
