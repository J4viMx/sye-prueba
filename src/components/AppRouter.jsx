import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import { RequireAuth } from "./RequireAuth";
import { Login } from "./Login";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      />
    </Routes>
  );
};
