import { TableRow, TableCell } from "@mui/material";

export default function Transaction({from, to, amount, time, user}) {
  let type = (from == to) ? "Deposit" : "Transfer";
  let isIncoming = (to == user) ? true : false;
  let arrowColor = isIncoming ? "green" : "red";
  let arrow = isIncoming ? "▲" : "▼";
  let transactionTiming = new Date(time);

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell style={{ color: arrowColor }}>{arrow}</TableCell>
              <TableCell>{type}</TableCell>
              <TableCell>{type == "Transfer" && isIncoming ? from : "-"}</TableCell>
              <TableCell>{type == "Transfer" && !isIncoming ? to : "-"}</TableCell>
              <TableCell>{`$${amount}`}</TableCell>
              <TableCell>{transactionTiming.toDateString()}</TableCell>
              <TableCell>{transactionTiming.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</TableCell>
    </TableRow>
  );
}