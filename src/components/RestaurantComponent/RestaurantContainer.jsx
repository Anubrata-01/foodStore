
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
// import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
// import useRestaurantData from "../../hooks/useRestaurantData";
// import RestaurantCard from "./RestaurantCard";
// import { NavLink } from "react-router-dom";

import React, { useMemo, useRef } from "react";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import RestaurantCard from "./RestaurantCard";
import { NavLink } from "react-router-dom";
import { useAtom } from "jotai";
import { userIdAtom } from "../../storeAtom/Atom";
import ShimmerEffect from "../../utilities/ShimmerEffect";

const RestaurantContainer = ({ resdata, error, isLoading }) => {
  const [usersId, setUsersId] = useAtom(userIdAtom);
  const moodData = useMemo(
    () =>
      resdata?.[0]?.card?.card?.imageGridCards?.info ||
      resdata?.[0]?.card?.card?.gridElements?.infoWithStyle?.info,
    [resdata]
  );
  const moodDataTitle = useMemo(
    () => resdata?.[0]?.card?.card?.header?.title || "",
    [resdata]
  );

  const scrollRef = useRef(null);

  const handleLeftArrow = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -window.innerWidth / 2,
        behavior: "smooth",
      });
    }
  };

  const handleRightArrow = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: window.innerWidth / 2,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) return <ShimmerEffect />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="mt-6  md:ml-8">
      <section className="ml-[7%] md:ml-[3%] flex justify-between">
        <h1 className="text-lg md:text-2xl text-pretty font-semibold">
          {moodDataTitle}
        </h1>
        <aside className="mr-[.5%] md:mr-[4%] flex md:flex gap-1.5 md:gap-3">
          <button aria-label="leftButton" onClick={handleLeftArrow}>
            <ArrowCircleLeftRoundedIcon style={{ fontSize: 32 }} />
          </button>
          <button aria-label="rightButton" onClick={handleRightArrow}>
            <ArrowCircleRightRoundedIcon style={{ fontSize: 32 }} />
          </button>
        </aside>
      </section>

      <section
        ref={scrollRef}
        className="w-[100%] md:w-[95%] p-1 md:p-2 flex gap-2 overflow-x-scroll ml-4 md:ml-8 mt-2 scroll-smooth no-scrollbar"
      >
        {moodData.map((item, index) => {
          let entityId = item?.action?.link;
          if (
            typeof entityId === "string" &&
            entityId.startsWith("https://www.swiggy.com/collections")
          ) {
            const collectionId = entityId.match(/collection_id=(\d+)/);
            entityId = collectionId ? collectionId[1] : entityId;
          }

          return (
            <NavLink
              to={`/${entityId}`}
              key={item.id || index}
              onClick={() => setUsersId(entityId)}
            >
              <RestaurantCard item={item} />
            </NavLink>
          );
        })}
      </section>
    </section>
  );
};

export default React.memo(RestaurantContainer);
