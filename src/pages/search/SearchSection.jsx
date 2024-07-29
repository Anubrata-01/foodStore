import React, { useMemo, useState, useEffect } from 'react';
import useRestaurantData from '../../hooks/useRestaurantData';
import useDebounce from '../../hooks/useDebounce';
import SearchedComponentCard from './SearchedComponentCard';

const SearchSection = () => {
  const [searchInput, setSearchInput] = useState("");
  const [displayRestaurant, setDisplayRestaurant] = useState(false);
  const [allRestaurantdata, setAllRestaurantdata] = useState([]);
  const [allSearchdata, setAllSearchdata] = useState([]);

  const { resdata, error, isLoading } = useRestaurantData();

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const debouncevalueSearchInput = useDebounce(searchInput, 350);

  const restaurantChainKolkataCards = useMemo(
    () =>
      resdata?.[1]?.card?.card?.imageGridCards?.info ||
      resdata?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [],
    [resdata]
  );

  const moodTodayCards = useMemo(
    () =>
      resdata?.[0]?.card?.card?.imageGridCards?.info ||
      resdata?.[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [],
    [resdata]
  );

  useEffect(() => {
    if (resdata) {
      setAllRestaurantdata([...restaurantChainKolkataCards, ...moodTodayCards]);
    }
  }, [resdata, restaurantChainKolkataCards, moodTodayCards]);

  useEffect(() => {
    if (debouncevalueSearchInput) {
      setDisplayRestaurant(true);
      const filteredData = allRestaurantdata.filter((restaurant) =>
        restaurant?.info?.name?.toLowerCase().includes(debouncevalueSearchInput.toLowerCase()) ||
        restaurant?.description?.toLowerCase().includes(debouncevalueSearchInput.toLowerCase())
      );
      setAllSearchdata(filteredData);
    } else {
      setDisplayRestaurant(false);
      setAllSearchdata([]);
    }
  }, [debouncevalueSearchInput, allRestaurantdata]);

  // if (!allSearchdata.length) return <div className='h-[500px]'>Search Anything here</div>;

  return (
    <div className='bg-slate-300'>
      <div className='w-[80%] md:w-[40%] ml-[10%] md:ml-[30%] '>
        <input
          type="text"
          placeholder='Search your favourite restaurants...'
          value={searchInput}
          className='w-full rounded-md p-4 border border-neutral-500 mt-10'
          onChange={handleInputChange}
        />
      </div>
      {displayRestaurant ? (
        <div className=' w-[80%] md:w-[40%] ml-[10%] md:ml-[30%]'>
          {isLoading && <p>Loading...</p>}
          {error && <p>Error loading data</p>}
          <ul>
            {allSearchdata.map((restaurant, index) => (
              <li key={index} className='border-b border-neutral-400 py-2'>
                <SearchedComponentCard info={restaurant?.info} />
              </li>
            ))}
          </ul>
        </div>
      ):(<div className=' h-[400px] text-center p-5 text-lg font-bold'>Nothing to show</div>)}
    </div>
  );
};

export default SearchSection;


