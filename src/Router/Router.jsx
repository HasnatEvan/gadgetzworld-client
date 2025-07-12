import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/HomePage/Home";
import Error from "../Error/Error";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import Dashboard from "../Layout/Dashboard";
import UserDashboard from "../pages/Customer/UserDashboard/UserDashboard";
import MyOrder from "../pages/Customer/MyOrder/MyOrder";
import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";
import AddProducts from "../pages/Admin/AddProducts/AddProducts";
import Wishlist from "../pages/Wishlist/Wishlist";
import ProductDetails from "../pages/HomePage/AllProduct/ProductDetails";
import ConfirmOrder from "../pages/HomePage/AllProduct/ConfirmOrder";
import ManageOrders from "../pages/Admin/Manage Orders/ManageOrders";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/product/:id',
        element: <ProductDetails></ProductDetails>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <Signup></Signup>
      },
      {
        path: '/wishlist',
        element: <Wishlist></Wishlist>
      },
      {
        path: '/ConfirmOrder/:id',
        element: <ConfirmOrder></ConfirmOrder>
      }
    ],
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: '/dashboard/user-dashboard',
        element: <UserDashboard></UserDashboard>
      },
      {
        path: '/dashboard/my-order',
        element: <MyOrder></MyOrder>
      },
      {
        path: '/dashboard/admin-dashboard',
        element: <AdminDashboard></AdminDashboard>
      },
      {
        path: '/dashboard/add-product',
        element: <AddProducts></AddProducts>
      },{
        path:'/dashboard/manage-orders',
        element:<ManageOrders></ManageOrders>
      }
    ]
  }
]);
