export default function Transaction({from, to, amount, time, user}) {
  let type = (from == to) ? "Deposit" : "Transfer";
  let isIncoming = (to == user) ? true : false;
  let arrowColor = isIncoming ? "green" : "red";
  let arrow = isIncoming ? "▲" : "▼";
  let transactionTiming = new Date(time);


  return (
    <tr className="TransactionRow">
      <td style={{ color: arrowColor }}>{arrow}</td>
      <td>{type}</td>
      <td>{type == "Transfer" && isIncoming ? from : ""}</td>
      <td>{type == "Transfer" && !isIncoming ? to : ""}</td>
      <td>{`$${amount}`}</td>
      <td>{transactionTiming.toDateString()}</td>
      <td>{transactionTiming.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
    </tr>
  )
}