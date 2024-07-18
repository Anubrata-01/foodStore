import React from "react";
import { Offer_img } from "../../constant/data";

const CardOffer = ({ RestaurantDetails }) => {
  const { descriptionList } =
    RestaurantDetails?.card?.card?.info?.aggregatedDiscountInfo || {};

  return (
    <section className=" mt-10 flex flex-col gap-6  md:flex-row md:justify-center">
      {descriptionList &&
        descriptionList.map((offer, index) => (
          <div
            key={index}
            className=" flex gap-2  border-2 w-[310px] p-2.5 rounded-lg text-black font-bold"
          >
            <img src={Offer_img} alt="" className=" w-[30px]  md:w-[45px]" />
            <div>
              {offer?.meta.split(" | ").map((part, subIndex) => (
                <div key={subIndex} className="flex flex-col">
                  {part}
                </div>
              ))}
            </div>
          </div>
        ))}
    </section>
  );
};

export default CardOffer;
