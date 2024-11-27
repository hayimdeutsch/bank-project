import { useState } from "react";

import useFetch from "../hooks/useFetch";

export default function Dashboard() {
  let [formData, setFormData] = useState({
    to: '',
    amount: ''
  });

  

  let {loading: l1, error: e1, data: d1 } = useFetch("api/v1/user/info");
  let {loading: l2, error: e2, data: d2 } = useFetch("api/v1/user/balance");
  let {loading: l3, error: e3, data: d3 } = useFetch("api/v1/user/transactions");

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
        <div>Transactions
          {d3 && <div>{JSON.stringify(d3)}</div>}
          { e3 && <p>Error</p> }
        </div>
        <div className="TransferForm">
          <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input type="email" id="to" name="to" value={formData.email} onChange={handleChange} required />

              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

              <button type="submit">Login</button>
          </form>
        </div>
    </div>
  );
}