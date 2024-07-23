import { useAtom } from "jotai";
import { useState } from "react";
import { Swigy_url } from "../../constant/data";
import { cartItemsAtom } from "../../storeAtom/Atom";

const FoodItem = ({ item }) => {
  const [cartItems, setCartItems] = useAtom(cartItemsAtom);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const maxLength = 100;
  const { name, defaultPrice, price, description, imageId, id } =
    item.card.info;
  const itemPrice = defaultPrice || price;
  // if ( description && description.length <= maxLength) {
  //   return <p className="text-gray-600">{description}</p>;
  // }
  const cartItem = cartItems.find((item) => item.id === id);
  const itemQuantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...prevItems, { id, name, price: itemPrice, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = () => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);

      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }

      return prevItems.filter((item) => item.id !== id);
    });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 p-4 border rounded-lg">
      <div className="flex-1 mb-4 sm:mb-0">
        <h3 className="font-semibold">{name}</h3>
        <p>₹{itemPrice / 100}</p>
        <div className="text-gray-600">
          {/* <p>
            {showFullDescription
              ?description
              : `${ description.substr(0, maxLength)}...`}
          </p> */}
          <p>{description}</p>
          {/* <button
            className="text-blue-500 text-sm mt-1"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? "Read less" : "Read more"}
          </button> */}
        </div>
      </div>
      <div className="flex flex-col items-center sm:ml-4">
        <img
          src={`${Swigy_url}${imageId}`}
          alt={name}
          className="w-24 h-24 object-cover rounded-md mb-2"
          loading="lazy"
        />
        {itemQuantity === 0 ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-l hover:bg-blue-600 transition-colors duration-300"
              onClick={handleRemoveFromCart}
            >
              -
            </button>
            <span className="bg-gray-200 px-3 py-1">{itemQuantity}</span>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-r hover:bg-blue-600 transition-colors duration-300"
              onClick={handleAddToCart}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodItem;
