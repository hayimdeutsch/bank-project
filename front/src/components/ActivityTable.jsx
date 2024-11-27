import { v4 as uuidv4 } from 'uuid';

import Transaction from "./Transaction";
import useFetch from "../hooks/useFetch";

export default function ActivityTable({url}) {
  let {loading, data, error } = useFetch(url);

  return (
    <div className="ActivityTable">
      <h1>ActivityTable</h1>
      {
        loading ?
        <div> Loading </div> :
          <table border={1}>
            <thead>
              <tr>
                <th></th>
                <th>Transaction Type</th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {
                data && data.transactions.map((transaction) => {
                  console.log(transaction)
                  return (<Transaction {...transaction} key={uuidv4()} user={"chayimdeutsch@gmail.com"}/>)
                })
              }
            </tbody>
          </table>
      }
          
    </div>
  );
}