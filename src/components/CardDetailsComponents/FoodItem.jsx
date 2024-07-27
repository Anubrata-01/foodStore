import { useAtom } from "jotai";
import { useCallback, useMemo, useState } from "react";
import { Swigy_url } from "../../constant/data";
import { cartItemsAtom } from "../../storeAtom/Atom";

const FoodItem = ({ item, }) => {
  const [cartItems, setCartItems] = useAtom(cartItemsAtom);
  const [showPopup, setShowPopup] = useState(false);

  const { name, defaultPrice, price, description, imageId, id, category } = item.card.info;
  const itemPrice = defaultPrice || price;

  const { cartItem, itemQuantity, isDifferentCategory } = useMemo(() => {
    const cartItem = cartItems.find((item) => item.id === id);
    const itemQuantity = cartItem ? cartItem.quantity : 0;
    const isDifferentCategory = cartItems.length > 0 && !cartItems.some(item => item.category === category);
    return { cartItem, itemQuantity, isDifferentCategory };
  }, [cartItems, id, category]);

  const addItemToCart = useCallback(() => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { id, name, price: itemPrice, quantity: 1, category,}];
    });
  }, [setCartItems, id, name, itemPrice, category]);

  const handleAddToCart = useCallback(() => {
    if (isDifferentCategory) {
      setShowPopup(true);
    } else {
      addItemToCart();
    }
  }, [isDifferentCategory, addItemToCart]);

  const handleRemoveFromCart = useCallback(() => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevItems.filter((item) => item.id !== id);
    });
  }, [setCartItems, id]);

  const handleStartFresh = useCallback(() => {
    setCartItems([{ id, name, price: itemPrice, quantity: 1, category }]);
    setShowPopup(false);
  }, [setCartItems, id, name, itemPrice, category]);
console.log(item);
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 p-4 border rounded-lg">
      <div className="flex-1 mb-4 sm:mb-0">
        <h3 className="font-semibold">{name}</h3>
        <p>₹{itemPrice / 100}</p>
        <div className="text-gray-600">
          <p>{description}</p>
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
            aria-label="addCart"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-l hover:bg-blue-600 transition-colors duration-300"
              onClick={handleRemoveFromCart}
              aria-label="increaseBtn"
            >
              -
            </button>
            <span className="bg-gray-200 px-3 py-1">{itemQuantity}</span>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-r hover:bg-blue-600 transition-colors duration-300"
              onClick={handleAddToCart}
              aria-label="decreaseBtn"
            >
              +
            </button>
          </div>
        )}
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center left-0 md:-left-40">
          <div className="bg-white p-6 rounded-lg">
            <p>
              This item is from a different category or restaurant. Do you want
              to start a new cart?
            </p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                onClick={() => setShowPopup(false)}
                aria-label="noBtn"
              >
                No
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleStartFresh}
                aria-label="startAfresh"
              >
                Start Fresh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodItem;
