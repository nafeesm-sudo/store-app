import { createBrowserRouter, Navigate } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import LocationPage from "./pages/LocationPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import BrowsePage from "./pages/BrowsePage";
import MyListPage from "./pages/MyListPage";
import WholesalePage from "./pages/WholesalePage";
import CartPage from "./pages/CartPage";
import OrderConfirmedPage from "./pages/OrderConfirmedPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/location", element: <LocationPage /> },
  { path: "/home", element: <HomePage /> },
  { path: "/product/:id", element: <ProductPage /> },
  { path: "/browse", element: <BrowsePage /> },
  { path: "/my-list", element: <MyListPage /> },
  { path: "/wholesale", element: <WholesalePage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/order-confirmed", element: <OrderConfirmedPage /> },
  { path: "/order-tracking", element: <OrderTrackingPage /> },
  { path: "*", element: <Navigate to="/" replace /> },
]);
