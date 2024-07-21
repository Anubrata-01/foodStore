
import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";

const Navbar = lazy(() => import("./components/Navbar"));

function App() {
  return (
    <div className="">
      <Suspense>
        <Navbar />
      </Suspense>
      <Outlet />
    </div>
  );
}

export default App;
