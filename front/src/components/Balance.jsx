import { Stack, Box } from "@mui/material";
import useProtectedFetch from "../hooks/useProtectedFetch";
import formatCurrency from "../utils/formatCurrency";
export default function Balance({ refresh }) {
  let { loading, error, data } = useProtectedFetch(
    "/user/balance",
    refresh
  );
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        borderRadius: 3,
        border: 1,
        padding: 2,
        backgroundColor: "background.paper",
      }}
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Stack direction="row" spacing={3}>
          <h2>Balance</h2>
          {data && <h2>{formatCurrency(data.balance)}</h2>}
          {/* { error && <p>{`Error - ${error?.msg}`}</p> } */}
        </Stack>
      )}
    </Box>
  );
}
