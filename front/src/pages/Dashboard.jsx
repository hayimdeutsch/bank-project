import { useState } from "react";

import useFetch from "../hooks/useFetch";
import handleFormSubmit from "../hooks/useFormSubmit";
import ActivityTable from "../components/ActivityTable";
import TransferForm from "../components/TransferForm";

export default function Dashboard() {

  let {loading: l1, error: e1, data: d1 } = useFetch("api/v1/user/info");
  let {loading: l2, error: e2, data: d2 } = useFetch("api/v1/user/balance");

  return (
    <div className="Dashboard">
      <h1>Dashboard</h1>
      <div>User Info
        {d1 && <div>{JSON.stringify(d1)}</div>}
        { e1 && <p>Error</p> }
      </div>
      <div>Balance
        {d2 && <div>{JSON.stringify(d2)}</div>}
        { e2 && <p>Error</p> }
      </div>
      <ActivityTable url={"api/v1/user/transactions"}/>

    </div>
  );
}