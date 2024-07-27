import React from "react";
import ShimmerEffect from "../../utilities/ShimmerEffect";

const RestaurantCardInterface = ({ RestaurantDetails }) => {
  const {
    name,
    areaName,
    avgRating,
    cuisines,
    costForTwoMessage,
    totalRatingsString,
    sla,
    feeDetails,
  } = RestaurantDetails?.card?.card?.info || {};

  if (!name) return <ShimmerEffect />;

  return (
    <div className="max-w-[90%] mx-auto mt-16 md:mt-16 bg-white rounded-xl shadow-md overflow-hidden md:max-w-xl outline outline-[20px] outline-zinc-200">
      <div className="md:flex">
        <div className="p-6">
          <div className="relative top-0 uppercase tracking-wide text-2xl text-black font-bold">
            {name}
          </div>
          <div className="mt-2 text-gray-800">
            <div className="flex items-center font-bold text-black">
              <span className="text-gray-600">★ {avgRating}</span>
              <span className="ml-2 text-sm text-gray-700">{totalRatingsString}</span>
              <span className="mx-2">·</span>
              <span className="text-gray-700">₹{costForTwoMessage}</span>
            </div>
            <div className="mt-1">
              <a href="#" className="text-red-600 hover:underline font-bold">
                {cuisines?.map((cuisine, index) => (
                  <span key={index}>
                    {cuisine}
                    {index < cuisines.length - 1 && ", "}
                  </span>
                ))}
              </a>
            </div>
            <div className="mt-2 flex items-center font-bold text-black">
              <span>Outlet</span>
              <span className="ml-2 text-gray-700 font-medium">{areaName}</span>
            </div>
            <div className="mt-1 text-black font-bold">{sla?.slaString}</div>
            <div className="mt-2 flex items-center text-gray-700">
              <span>{sla?.lastMileTravelString}</span>
              {/* <span className="ml-2"> | {feeDetails?.message.split(" | ")[1] || ""}</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCardInterface;

