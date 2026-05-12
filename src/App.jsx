import {
  Routes,
  Route,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import TicketPage from "./pages/TicketPage";
import {
  lazy,
  Suspense,
} from "react";

const AdminPage =
  lazy(() =>
    import("./pages/AdminPage")
  );

const CheckinPage =
  lazy(() =>
    import("./pages/CheckinPage")
  );

export default function App() {
  return (
<Suspense
  fallback={
    <div className="min-h-screen flex items-center justify-center bg-[#071739] text-white text-2xl font-bold">
      Loading...
    </div>
  }
>

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
    </Suspense>
  );
}