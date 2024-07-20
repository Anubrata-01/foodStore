import PropTypes from "prop-types";
import { Star_svg, Swigy_url } from "../../constant/data";
import GetCompressedImg from "../../storeAtom/GetCompressImage";
import React from "react";
const RestaurantCardComponent = ({
  name,
  locality,
  cuisines,
  imageUrl,
  sla,
  avgRating,
  aggregatedDiscountInfoV3,
}) => {
  // Limit the number of cuisines to 3
  const getDisplayedCuisines = (cuisines, maxLength) => {
    let totalLength = 0;
    let result = [];

    for (const cuisine of cuisines) {
      if (totalLength + cuisine.length > maxLength) break;
      result.push(cuisine);
      totalLength += cuisine.length;
      if (totalLength < maxLength) totalLength++; // Account for the comma and space
    }

    return result;
  };

  const maxCuisinesLength = 20;
  const displayedCuisines = cuisines
    ? getDisplayedCuisines(cuisines, maxCuisinesLength)
    : [];
  const maxNameLength = 20;
  const displayedName =
    name.length > maxNameLength ? `${name.slice(0, maxNameLength)}...` : name;

  return (
    <section className="bg-white rounded-lg shadow-md overflow-hidden m-2 w-64 h-[30]">
      <section className="relative">
        {/* <GetCompressedImg imageUrl={Swigy_url + imageUrl} /> */}
        <img src={Swigy_url + imageUrl} alt="img" className=" w-full h-40 object-cover" />
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-1 text-sm">
          {aggregatedDiscountInfoV3 ? (
            <span className=" text-white font-bold">
              {aggregatedDiscountInfoV3?.header} {aggregatedDiscountInfoV3?.subHeader}
            </span>
          ) : (
            "10% OFF UPTO 35"
          )}
        </div>
      </section>
      <section className="p-4">
        <h2 className="text-lg font-bold">{displayedName}</h2>
        <div className="flex items-center  text-sm my-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            role="img"
            aria-hidden="true"
            strokecolor="rgba(2, 6, 12, 0.92)"
            fillcolor="rgba(2, 6, 12, 0.92)"
          >
            <circle
              cx="10"
              cy="10"
              r="9"
              fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"
            ></circle>
            <path
              d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z"
              fill="white"
            ></path>
            <defs>
              <linearGradient
                id="StoreRating20_svg__paint0_linear_32982_71567"
                x1="10"
                y1="1"
                x2="10"
                y2="19"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#21973B"></stop>
                <stop offset="1" stopColor="#128540"></stop>
              </linearGradient>
            </defs>
          </svg>
          <span className="ml-1">{avgRating}</span>
          <span className="ml-2">• {sla} </span>
        </div>
        <p className="text-gray-600">
          {displayedCuisines.join(",")}
          {cuisines.length > 3 && "..."}
        </p>
        <p className="text-gray-600">{locality}</p>
      </section>
    </section>
  );
};

RestaurantCardComponent.propTypes = {
  name: PropTypes.string.isRequired,
  locality: PropTypes.string,
  cuisines: PropTypes.arrayOf(PropTypes.string).isRequired,
  costForTwo: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  sla: PropTypes.string.isRequired,
  areaName: PropTypes.string.isRequired,
  avgRating: PropTypes.number.isRequired,
  aggregatedDiscountInfoV3: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      header: PropTypes.string,
      subHeader: PropTypes.string,
    }),
  ]),
};

export default React.memo(RestaurantCardComponent);
