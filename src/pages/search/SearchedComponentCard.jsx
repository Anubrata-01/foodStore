import React from 'react'
import { Swigy_url } from '../../constant/data';

const SearchedComponentCard = ({info}) => {
    const {name,cloudinaryImageId,areaName}=info || {};
  return (
    <section>
        <div className=' flex justify-between'>
            <div className=' text-stone-600'>
            <p>{name}</p>
            <p>{areaName}</p>
            </div>
            <img src={Swigy_url+cloudinaryImageId} alt={name} className=' w-[50px] h-[50px] rounded-md object-cover'/>
        </div>
    </section>
  )
}

export default SearchedComponentCard