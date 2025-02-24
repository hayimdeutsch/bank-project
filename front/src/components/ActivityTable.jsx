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
    "/user/transactions",
    refresh
  );
  let {
    loading: loadingBalance,
    error: balanceError,
    data: balance,
  } = useProtectedFetch("/user/balance", refresh);

  useEffect(() => {
    if (transactionData) {
      setTransactions(transactionData.transactions);
    }
  }, [transactionData]);

  const options = {
    year: "2-digit",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

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
      headerName: "Type",
      headerAlign: "center",
      align: "center",
      editable: false,
      resizable: false,
      flex: 0.2,
    },
    {
      field: "from/to",
      headerName: "From/To",
      headerAlign: "center",
      editable: false,
      resizable: false,
      flex: 0.3,
    },
    {
      field: "date",
      headerName: "Date",
      headerAlign: "center",
      align: "center",
      flex: 0.3,
      renderCell: (params) =>
        (params?.row?.date).toLocaleDateString(undefined, options),
      resizable: false,
    },
    {
      field: "amount",
      headerName: "Amount",
      headerAlign: "center",
      editable: false,
      flex: 0.2,
      renderCell: (params) => formatCurrency(params.row?.amount),
      sortComparator: (v1, v2) => Number(v1) - Number(v2),
      resizable: false,
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
            <Typography variant="h5">Balance</Typography>
            {balance && (
              <Typography variant="h5">
                {formatCurrency(balance.balance)}
              </Typography>
            )}
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
            rowHeight={56}
            sx={{
              "& .MuiDataGrid-cell": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              fontSize: "1.2rem",
              lineHeight: "1.5",
            }}
            initialState={{
              sorting: {
                sortModel: [{ field: "date", sort: "desc" }],
              },
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
  let other = type == "Deposit" ? "-" : isIncoming ? from : to;

  return {
    id: index,
    direction: isIncoming,
    type,
    "from/to": other,
    amount,
    date: new Date(time),
  };
}
