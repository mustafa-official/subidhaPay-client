import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layout/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/Dashboard/Profile";
import AllUser from "../pages/Dashboard/AllUser";
import SendMoney from "../pages/Dashboard/SendMoney";
import CashOut from "../pages/Dashboard/CashOut";
import CashIn from "../pages/Dashboard/CashIn";
import ManageTransReq from "../pages/Dashboard/ManageTransReq";
import TransactionHistory from "../pages/Dashboard/TransactionHistory";
import TransHistoryAgent from "../pages/Dashboard/TransHistoryAgent";
import AllTransaction from "../pages/Dashboard/AllTransaction";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "all-user",
        element: <AllUser></AllUser>,
      },
      {
        path: "send-money",
        element: <SendMoney></SendMoney>,
      },
      {
        path: "cash-out",
        element: <CashOut></CashOut>,
      },
      {
        path: "cash-in",
        element: <CashIn></CashIn>,
      },
      {
        path: "trans-request",
        element: <ManageTransReq></ManageTransReq>,
      },
      {
        path: "transaction-history",
        element: <TransactionHistory></TransactionHistory>,
      },
      {
        path: "transaction-history-agent",
        element: <TransHistoryAgent></TransHistoryAgent>,
      },
      {
        path: "all-transaction",
        element: <AllTransaction></AllTransaction>,
      },
    ],
  },
]);
export default router;
