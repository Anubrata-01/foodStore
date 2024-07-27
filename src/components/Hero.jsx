import React, { lazy, Suspense, useEffect, useState, useCallback } from "react";
import { useAtom } from "jotai";
import { useLocation } from "react-router-dom";
import { moodDataAtom, topRestaurantDetailsDataAtom } from "../storeAtom/Atom";
import useRestaurantData from "../hooks/useRestaurantData";
import ShimmerEffect from "../utilities/ShimmerEffect";

const RestaurantContainer = lazy(() => import("./RestaurantComponent/RestaurantContainer"));
const TopRestaurantChainInKolkata = lazy(() => import("./TopRestaurants/TopRestaurantInKolkata"));
const LazyOnlineFoodDeliverComponents = lazy(() => import("./OnlineFoodComponents/OnlineFoodDeliveryComponents"));

const Hero = () => {
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const { resdata, error, isLoading } = useRestaurantData(fetchTrigger);
  const [, setMoodData] = useAtom(moodDataAtom);
  const [, setTopRestaurantDetailsData] = useAtom(topRestaurantDetailsDataAtom);
  const location = useLocation();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [extraRestsData, setExtraRestsData] = useState([]);

  const loadMoreData = useCallback(() => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      setTimeout(() => {
        // Logic to fetch and append more restaurant data
        setIsLoadingMore(false);
      }, 2000);
    }
  }, [isLoadingMore]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollHeight - scrollTop <= clientHeight + 400) {
        loadMoreData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreData]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.pathname === "/") {
      setMoodData([]);
      setTopRestaurantDetailsData([]);
    }
    if (!fetchTrigger) {
      setFetchTrigger(true);
    }
  }, [location.pathname, fetchTrigger, setMoodData, setTopRestaurantDetailsData]);

  const sharedProps = { resdata, error, isLoading };

  return (
    <section className="bg-gray-200 p-3">
      {isLoading ? (
        <ShimmerEffect />
      ) : (
        <Suspense fallback={<ShimmerEffect />}>
          <RestaurantContainer {...sharedProps} />
          <TopRestaurantChainInKolkata {...sharedProps} />
          <LazyOnlineFoodDeliverComponents
            {...sharedProps}
            extraRestsData={extraRestsData}
            isLoadingMore={isLoadingMore}
          />
        </Suspense>
      )}
    </section>
  );
};

export default React.memo(Hero);
