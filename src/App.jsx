
import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import Footer from "./pages/Footer/Footer";

const Navbar = lazy(() => import("./components/Navbar"));

function App() {
  return (
    <div className="">
      <Suspense>
        <Navbar />
      </Suspense>
      <Outlet />
      <Footer/>
    </div>
  );
}

export default App;
