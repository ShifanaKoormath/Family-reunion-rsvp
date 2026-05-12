import {
  Routes,
  Route,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import TicketPage from "./pages/TicketPage";
import AdminPage from "./pages/AdminPage";
import CheckinPage from "./pages/CheckinPage";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/ticket/:id"
        element={<TicketPage />}
      />
      <Route
  path="/admin"
  element={<AdminPage />}
/>
<Route
  path="/admin/checkin"
  element={<CheckinPage />}
/>
    </Routes>
  );
}