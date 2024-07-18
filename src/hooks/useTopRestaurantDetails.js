import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { topRestaurantDetailsDataAtom } from '../storeAtom/Atom'

const useTopRestaurantDetails = (userId) => {
    const[ ,setTopRestaurantDetailsData]=useAtom(topRestaurantDetailsDataAtom)
  useEffect(()=>{
    const fetchTopResChainInKolkata=async()=>{
        
        try{
            const response= await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.469788246717883&lng=88.3891574665904&restaurantId=${userId}&catalog_qa=undefined&submitAction=ENTER`);
            if(!response.ok){
                throw new Error("faild to fetched TopRestaurantChainInKolkata")
            }
        
            const data=await response.json();
            setTopRestaurantDetailsData(data);
            console.log(data);
        }catch(err){
            console.log("Error is: ",err)
        }
    }
    if(userId){
        fetchTopResChainInKolkata()
    }
  },[userId,setTopRestaurantDetailsData])
}

export default useTopRestaurantDetails