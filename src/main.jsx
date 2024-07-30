import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import "./index.css";
import About from "./pages/About.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ShimmerEffect from "./utilities/ShimmerEffect.jsx";
import Cart from "./pages/CartSection/Cart.jsx";
import SearchSection from "./pages/search/SearchSection.jsx";
import ShimmerCard from "./utilities/ShimmerCard.jsx";
// import ShimmerItemDetailsContainer from "./utilities/ShimmerRestaurantCard.jsx";
const queryClient=new QueryClient();
const MoodItemContainer=lazy(()=> import ("./pages/MoodItemDetails/MoodItemContainer"));
const FoodDeliveryDetails=lazy(()=> import ("./pages/FoodDetails/FoodDeliveryInterface.jsx"));
const CartComponent=lazy(()=> import ("./pages/CartSection/Cart.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:"/",
        element:<Hero/>
      },
      {
        path:":userId",
        element:<Suspense>
          <MoodItemContainer/>
        </Suspense>
      },
      {
        path:"/top-res/:userId",
        element:<Suspense>
          <FoodDeliveryDetails/>
        </Suspense>
      },
      {
        path:"/mod-restaurant/:userId",
        element:<Suspense>
          <FoodDeliveryDetails/>
        </Suspense>
      },
      {
        path:"/online-restaurant/:userId",
        element:<Suspense>
          <FoodDeliveryDetails/>
        </Suspense>
      },
      {
        path:"/cart",
        element:<Suspense fallback=<ShimmerCard/>>
         
          <CartComponent/>
        </Suspense>
      },
      {
        path:"/search",
        element:<SearchSection/>
      }
     
    ],
  },
  {
    path: "about",
    element: <About Navbar={<Navbar />} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
    
  </React.StrictMode>
);
