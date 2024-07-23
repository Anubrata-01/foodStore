import React from "react";
import ShimmerCard from "./ShimmerCard";

const ShimmerItemDetailsContainer = () => {
  return (
    <section className=" ml-[3%] md:ml-[2%]">
      <section className=" flex  mt-[2%] ">
        <div>
          <div className="w-48 h-8 bg-gray-300 rounded mb-2 animate-pulse"></div>
          <div className="w-72 h-6 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </section>
      <section className="flex flex-wrap  mt-[2%]">
        {Array(12)
          .fill("")
          .map((_, index) => (
            <div key={index} className="m-2">
              <ShimmerCard />
            </div>
          ))}
      </section>
    </section>
  );
};

export default ShimmerItemDetailsContainer;








