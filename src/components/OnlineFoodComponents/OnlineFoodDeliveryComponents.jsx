
import React, { useMemo } from "react";
import RestaurantCardComponent from "../TopRestaurants/RestaurantCardComponent";
import { NavLink } from "react-router-dom";
import { OnlineFoodDeliverTitle } from "../../constant/data";
import { useAtom } from "jotai";
import { userIdAtom } from "../../storeAtom/Atom";

const OnlineFoodDeliveryComponents = ({ resdata, error, isLoading, extraRestsData = [], isLoadingMore }) => {
  const [, setUsersId] = useAtom(userIdAtom);

  const OnlinerestaurantCards = useMemo(
    () =>
      resdata?.[4]?.card?.card?.imageGridCards?.info ||
      resdata?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [],
    [resdata]
  );
  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-4 text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <section className="mt-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-lg sm:text-2xl font-semibold mb-4 ml-4 md:ml-1">
        {OnlineFoodDeliverTitle}
      </h1>
      <div className="ml-2 md:ml-0 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {OnlinerestaurantCards.map((item, index) => {
          const {
            id,
            name,
            locality,
            cuisines,
            costForTwo,
            cloudinaryImageId,
            isOpen,
            sla,
            areaName,
            avgRating,
            aggregatedDiscountInfoV3,
          } = item?.info;
          return (
            <NavLink
              to={`/online-restaurant/${id}`}
              key={`${id}-${index}`}  // Use a composite key
              onClick={() => setUsersId()}
              className="block rounded-lg overflow-hidden"
            >
              <RestaurantCardComponent
                name={name}
                locality={locality}
                cuisines={cuisines}
                costForTwo={costForTwo}
                imageUrl={cloudinaryImageId}
                isOpen={isOpen}
                sla={sla?.slaString}
                areaName={areaName}
                avgRating={avgRating}
                aggregatedDiscountInfoV3={aggregatedDiscountInfoV3}
              />
            </NavLink>
          );
        })}
      </div>
    </section>
  );
};

export default OnlineFoodDeliveryComponents;

