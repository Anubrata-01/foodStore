import { Swigy_url } from "../../constant/data";

const FoodItem = (({ item }) => (
    <div className="flex justify-between items-center mb-4 p-4 border rounded-lg">
      <div className="flex-1">
        <h3 className="font-semibold">{item?.card?.info?.name}</h3>
        <p>₹{(item?.card?.info?.defaultPrice || item?.card?.info?.price) / 100}</p>
        <p className="text-gray-600">{item?.card?.info?.description}</p>
      </div>
      <div className="flex flex-col items-center ml-4">
        <img 
          src={Swigy_url + item?.card?.info?.imageId} 
          alt={item.name} 
          className="w-24 h-24 object-cover rounded-md mb-2"
          loading="lazy"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  ));

  export default FoodItem