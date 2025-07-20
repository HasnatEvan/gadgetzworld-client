import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/HomePage/Home";
import Error from "../Error/Error";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import Dashboard from "../Layout/Dashboard";
import MyOrder from "../pages/Customer/MyOrder/MyOrder";
import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";
import AddProducts from "../pages/Admin/AddProducts/AddProducts";
import Wishlist from "../pages/Wishlist/Wishlist";
import ProductDetails from "../pages/HomePage/AllProduct/ProductDetails";
import ConfirmOrder from "../pages/HomePage/AllProduct/ConfirmOrder";
import ManageOrders from "../pages/Admin/Manage Orders/ManageOrders";
import OrderDetails from "../pages/Admin/Manage Orders/OrderDetails";
import MyInventory from "../pages/Admin/MyInventory/MyInventory";
import EditInventory from "../pages/Admin/MyInventory/EditInventory";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import TrackOrder from "../pages/HomePage/Track Order/TrackOrder";
import AddBanner from "../pages/Admin/AddBanner/AddBanner";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <Signup></Signup>
      },
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/product/:id',
        element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
      },
      {
        path: '/wishlist',
        element: <PrivateRoute> <Wishlist></Wishlist></PrivateRoute>
      },
      {
        path: '/ConfirmOrder/:id',
        element: <PrivateRoute><ConfirmOrder></ConfirmOrder></PrivateRoute>
      },
      {
        path:'/track-order',
        element:<TrackOrder></TrackOrder>
      }
    ],
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard></Dashboard>,</PrivateRoute>,
    children: [

      {
        path: '/dashboard/my-order',
        element: <PrivateRoute><MyOrder></MyOrder></PrivateRoute>
      },
      {
        path: '/dashboard/admin-dashboard',
        element: <AdminRoute> <PrivateRoute><AdminDashboard></AdminDashboard></PrivateRoute></AdminRoute>
      },
      {
        path: '/dashboard/add-product',
        element: <AdminRoute> <PrivateRoute><AddProducts></AddProducts></PrivateRoute></AdminRoute>
      }, {
        path: '/dashboard/manage-orders',
        element: <AdminRoute> <PrivateRoute><ManageOrders></ManageOrders></PrivateRoute></AdminRoute>
      }, {
        path: '/dashboard/order-details/:id',
        element: <AdminRoute><PrivateRoute><OrderDetails></OrderDetails></PrivateRoute></AdminRoute>
      },
      {
        path: '/dashboard/my-inventory',
        element: <AdminRoute> <PrivateRoute><MyInventory></MyInventory></PrivateRoute></AdminRoute>
      },
      {
        path: 'edit-products/:id',
        element: <AdminRoute><PrivateRoute><EditInventory></EditInventory></PrivateRoute></AdminRoute>
      },
      {
        path:'/dashboard/add-banner',
        element:<AddBanner></AddBanner>
      }

    ]
  }
]);
