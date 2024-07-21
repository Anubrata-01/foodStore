import React, { lazy, Suspense, useEffect, useState } from "react";
import RestaurantContainer from "./RestaurantComponent/RestaurantContainer";
import useRestaurantData from "../hooks/useRestaurantData";
import { useAtom } from "jotai";
import { useLocation } from "react-router-dom";
import { moodDataAtom, topRestaurantDetailsDataAtom } from "../storeAtom/Atom";
import ShimmerEffect from "../utilities/ShimmerEffect";
const TopRestaurantChainInKolkata = lazy(() =>
  import("./TopRestaurants/TopRestaurantInKolkata")
);
const Hero = () => {
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const { resdata, error, isLoading } = useRestaurantData(fetchTrigger);
  const [, setMoodData] = useAtom(moodDataAtom);
  const [,setTopRestaurantDetailsData] = useAtom(topRestaurantDetailsDataAtom);

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setMoodData([]);
      setTopRestaurantDetailsData([])

    }
  }, []);
  useEffect(() => {
    if (!fetchTrigger) {
      setFetchTrigger(true);
    }
  }, []);
  resdata && console.log(resdata);

  return (
    <section className="bg-gray-200 p-3 ">
      <Suspense fallback={<div>Loadi</div>}>
        <RestaurantContainer
          resdata={resdata}
          error={error}
          isLoading={isLoading}
        />
      </Suspense>
      <Suspense fallback={<ShimmerEffect />}>
        <TopRestaurantChainInKolkata
          resdata={resdata}
          error={error}
          isLoading={isLoading}
        />
      </Suspense>
    </section>
  );
};

export default Hero;
