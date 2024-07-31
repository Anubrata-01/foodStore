
import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import Footer from "./pages/Footer/Footer";
import { ToastContainer } from "react-toastify";
const Navbar = lazy(() => import("./components/Navbar"));

function App() {
  return (
    <div className="">
      <Suspense>
        <Navbar />
      </Suspense>
      <Outlet />
      <Footer/>
      <ToastContainer/>
    </div>
  );
}

export default App;
