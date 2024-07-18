import React, { useEffect, useMemo } from "react";
import useTopRestaurantDetails from "../../hooks/useTopRestaurantDetails";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { topRestaurantDetailsDataAtom, userIdAtom } from "../../storeAtom/Atom";
import RestaurantCardInterface from "../../components/RestaurantCardInterface";
import CardOffer from "../../components/CardDetailsComponents/CardOffer";

const FoodDeliveryInterface = () => {
  const { userId } = useParams();
  const [, setUserId] = useAtom(userIdAtom);
  const [topRestaurantDetailsData] = useAtom(topRestaurantDetailsDataAtom);
  if (userId) {
    useTopRestaurantDetails(userId);
  }
  useEffect(() => {
    setUserId(userId);
  }, [userId, setUserId]);
  const RestaurantDetails = useMemo(
    () => topRestaurantDetailsData?.data?.cards[2],
    [topRestaurantDetailsData]
  );

  return (
    <section>
      <RestaurantCardInterface RestaurantDetails={RestaurantDetails} />
      <CardOffer RestaurantDetails={RestaurantDetails}/>
    </section>
  );
};

export default FoodDeliveryInterface;

// export default RestaurantCard;
