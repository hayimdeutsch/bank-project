// import { v4 as uuidv4 } from "uuid";

// import Transaction from "./Transaction";
// import useProtectedFetch from "../hooks/useProtectedFetch";
// import { useAuthContext } from "../context/UserContext";

// import {
//   Stack,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableBody,
//   TableCell,
// } from "@mui/material";

// export default function ActivityTable() {
//   let { loading, data, error } = useProtectedFetch("api/v1/user/transactions");
//   let { activeUser } = useAuthContext();

//   return (
//     <div className="ActivityTable">
//       <h3>ActivityTable</h3>
//       <Balance />
//       {loading ? (
//         <div> Loading... </div>
//       ) : (
//         // error ?
//         // <div>{error.msg } </div> :
//         <TableContainer>
//           <Table
//             sx={{ padding: 2, minWidth: 650, border: 1, borderRadius: 3 }}
//             aria-label="simple table"
//           >
//             <TableHead>
//               <TableRow>
//                 <TableCell></TableCell>
//                 <TableCell>Transaction Type</TableCell>
//                 <TableCell>From</TableCell>
//                 <TableCell>To</TableCell>
//                 <TableCell>Amount</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Time</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {data &&
//                 data.transactions.map((transaction) => {
//                   return (
//                     <Transaction
//                       {...transaction}
//                       key={uuidv4()}
//                       user={activeUser.user}
//                     />
//                   );
//                 })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </div>
//   );
// }

// function Balance() {
//   let { loading, error, data } = useProtectedFetch("api/v1/user/balance");
//   return (
//     <>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <Stack direction="row" spacing={6} justifyContent={"flex-end"}>
//           <h4>Balance</h4>
//           {data && (
//             <h4>
//               {data.balance.toLocaleString("en-US", {
//                 style: "currency",
//                 currency: "USD",
//               })}
//             </h4>
//           )}
//           {/* { error && <p>{`Error - ${error?.msg}`}</p> } */}
//         </Stack>
//       )}
//     </>
//   );
// }

import { useEffect, useState } from "react";

import Transaction from "./Transaction";
import useProtectedFetch from "../hooks/useProtectedFetch";
import { useAuthContext } from "../context/UserContext";
import formatCurrency from "../utils/formatCurrency";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";

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
      editable: false,
      resizable: false,
      flex: 0.05,
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
    <Box className="ActivityTable">
      <h3>ActivityTable</h3>
      <Balance refresh={refresh} />
      <Box
        sx={{
          width: "100%",
          backgroundColor: "background.paper",
          height: 500,
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
        />
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
  let arrowColor = isIncoming ? "green" : "red";
  let arrow = isIncoming ? "▲" : "▼";
  let transactionTiming = new Date(time);
  let other = type == "Deposit" ? "-" : isIncoming ? from : to;

  return {
    id: index,
    direction: arrow,
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
