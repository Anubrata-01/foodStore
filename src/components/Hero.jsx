import React, { lazy, Suspense, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useLocation } from "react-router-dom";
import { moodDataAtom, topRestaurantDetailsDataAtom } from "../storeAtom/Atom";
import useRestaurantData from "../hooks/useRestaurantData";
import ShimmerEffect from "../utilities/ShimmerEffect";
import ShimmerCard from "../utilities/ShimmerCard";

const RestaurantContainer = lazy(() => import("./RestaurantComponent/RestaurantContainer"));
const TopRestaurantChainInKolkata = lazy(() => import("./TopRestaurants/TopRestaurantInKolkata"));
const LazyOnlineFoodDeliverComponents = lazy(() => import("./OnlineFoodComponents/OnlineFoodDeliveryComponents"));

const Hero = () => {
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const { resdata, error, isLoading } = useRestaurantData(fetchTrigger);
  const [, setMoodData] = useAtom(moodDataAtom);
  const [, setTopRestaurantDetailsData] = useAtom(topRestaurantDetailsDataAtom);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.pathname === "/") {
      setMoodData([]);
      setTopRestaurantDetailsData([]);
      setFetchTrigger(true);
    }
    if (!fetchTrigger) {
      setFetchTrigger(true);
    }
  }, [location.pathname, fetchTrigger, setMoodData, setTopRestaurantDetailsData]);

  const sharedProps = { resdata, error, isLoading };

  return (
    <section className="bg-gray-200 p-3">
      {isLoading ? (
        <ShimmerEffect/>
      ) : (
        <Suspense fallback={<ShimmerEffect />}>
          <RestaurantContainer {...sharedProps} />
          <TopRestaurantChainInKolkata {...sharedProps} />
          <LazyOnlineFoodDeliverComponents
            {...sharedProps}
          />
        </Suspense>
      )}
    </section>
  );
};

export default React.memo(Hero);

