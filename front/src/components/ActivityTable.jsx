import { v4 as uuidv4 } from "uuid";

import Transaction from "./Transaction";
import useProtectedFetch from "../hooks/useProtectedFetch";
import { useAuthContext } from "../context/UserContext";

import {
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";

export default function ActivityTable() {
  let { loading, data, error } = useProtectedFetch("api/v1/user/transactions");
  let { activeUser } = useAuthContext();

  return (
    <div className="ActivityTable">
      <h3>ActivityTable</h3>
      <Balance />
      {loading ? (
        <div> Loading... </div>
      ) : (
        // error ?
        // <div>{error.msg } </div> :
        <TableContainer>
          <Table
            sx={{ padding: 2, minWidth: 650, border: 1, borderRadius: 3 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Transaction Type</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.transactions.map((transaction) => {
                  return (
                    <Transaction
                      {...transaction}
                      key={uuidv4()}
                      user={activeUser.user}
                    />
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

function Balance() {
  let { loading, error, data } = useProtectedFetch("api/v1/user/balance");
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Stack direction="row" spacing={6} justifyContent={"flex-end"}>
          <h4>Balance</h4>
          {data && (
            <h4>
              {data.balance.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h4>
          )}
          {/* { error && <p>{`Error - ${error?.msg}`}</p> } */}
        </Stack>
      )}
    </>
  );
}
