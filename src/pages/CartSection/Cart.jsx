import { useAtom } from "jotai";
import { cartItemsAtom } from "../../storeAtom/Atom";
import { useMemo, useState } from "react";
import { unstable_HistoryRouter, useNavigate } from "react-router-dom";

const Cart = ({ Navbar }) => {
  const [cartItems, setCartItems] = useAtom(cartItemsAtom);
  const [noContactDelivery, setNoContactDelivery] = useState(false);
  const naviagte = useNavigate();
  const totalAmount = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  if (cartItems.length === 0) {
    return (
      <div className=" bg-stone-200 flex flex-col items-center justify-center h-[450px] ">
        <img
          src="https://food-plaza-project.onrender.com/Cart-empty.cdd853dc.png"
          alt="Empty Cart"
          className="w-32 h-32 mb-4"
        />
        <p className="text-xl font-semibold text-gray-600">
          Your cart is empty
        </p>
        <p className="text-gray-400">Add some delicious items to your cart!</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8  bg-sky-50">
      <div className="bg-gray-100 rounded-lg shadow-md p-4 sm:p-6 mt-0 border-2 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row justify-between items-center mb-4 pb-4 border-b"
          >
            <div className="mb-4 sm:mb-8">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">₹{item.price / 100}</p>
            </div>
            <div className="flex items-center ">
              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden w-fit">
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }
                  className="px-3 py-1 text-xl text-gray-600 hover:bg-gray-100 focus:outline-none"
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  readOnly
                  className="w-16 text-center border-none focus:outline-none"
                />
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity + 1)
                  }
                  className="px-2 py-1 text-xl text-gray-600 hover:bg-gray-100 focus:outline-none"
                >
                  +
                </button>
              </div>
              <button
                className="ml-4 text-red-500 hover:text-red-700"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="flex flex-col sm:flex-row justify-between mb-4">
          <button
            className="px-4 py-2 border rounded text-red-500 hover:bg-red-100 mb-2 sm:mb-0"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
          <button className="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600" onClick={() => naviagte(-1)}>
            Add More Items
          </button>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={noContactDelivery}
              onChange={() => setNoContactDelivery(!noContactDelivery)}
              className="mr-2"
            />
            <span>Opt in for No-contact Delivery</span>
          </label>
          <p className="text-sm text-gray-600 ml-5">
            Unwell, or avoiding contact? Please select no-contact delivery.
            Partner will safely place the order outside your door (not for COD)
          </p>
        </div>
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Subtotal:</span>
            <span>₹{totalAmount / 100}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Delivery Fee:</span>
            <span>₹40</span>
          </div>
          <div className="flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span>₹{(totalAmount + 4000) / 100}</span>
          </div>
        </div>
        <button
          className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300"
          onClick={() => {
            // Implement payment logic here
            alert("Proceeding to payment...");
          }}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Cart;
