/* eslint-disable no-unsafe-optional-chaining */

import React, { useMemo } from "react";
import ShimmerEffect from "../../utilities/ShimmerEffect";
import RestaurantCardComponent from "../../components/TopRestaurants/RestaurantCardComponent";
import { NavLink } from "react-router-dom";
import { ShimmerCol } from "../../utilities/shimmerr";

const ItemsDetailsContainer = ({ Mooddata }) => {
  const { title, description } = useMemo(() => {
    const cardData = Mooddata?.data?.cards[0]?.card?.card;
    return {
      title: cardData?.title,
      description: cardData?.description,
    };
  }, [Mooddata]);

  const moodRescards = useMemo(() => {
    const cards = Mooddata?.data?.cards || [];
    return cards.filter(
      (data) =>
        data?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
    );
  }, [Mooddata]);

  if (!title) return <ShimmerEffect />; 
  console.log(moodRescards);

  return (
    <section>
      <section className=" ml-[16%] mt-[2%] md:ml-[3%]">
        <div>
          <p className="text-2xl font-bold">{title}</p>
          <p className="text-lg text-gray-700">{description}</p>
        </div>
      </section>
      <section className="flex flex-wrap justify-center mt-[2%]">
        {moodRescards?.map((card, index) => {
          const {
            name,
            locality,
            cuisines,
            costForTwo,
            cloudinaryImageId,
            isOpen,
            sla,
            areaName,
            avgRating,
            aggregatedDiscountInfoV3
          } = card?.card?.card?.info;

          return (
            
            
              <RestaurantCardComponent
                name={name}
                key={index}
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
           
          
          );
        })}
      </section>
    </section>
  );
};

export default ItemsDetailsContainer;
