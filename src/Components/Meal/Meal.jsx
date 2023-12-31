import React, { useState } from "react";
import { addMealsToBooking } from "../../redux/reducers/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const Meal = ({ setShowLuggage, setShowMeal, setShowSeat, storedBooking }) => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings?.bookings);

  const [orderList, setOrderList] = useState(bookings?.meals || []);

  const menu = [
    {
      name: "Rice with fried fish",
      price: 1,
    },
    {
      name: "Rice with chicken",
      price: 2,
    },
    {
      name: "Rice with grill rib",
      price: 5,
    },
    {
      name: "Rice with Dieu Hong fish",
      price: 4,
    },
    {
      name: "Rice with cat fish",
      price: 2,
    },
    {
      name: "Fried rice with sea food",
      price: 3,
    },
    {
      name: "Fried rice with fried chicken",
      price: 5,
    },
    {
      name: "Fried rice with boiled chicken",
      price: 7,
    },
    {
      name: "Noodles with sea food",
      price: 3,
    },
    {
      name: "Hu tieu with sea food",
      price: 2,
    },
    {
      name: "Extra rice",
      price: 0,
    },
    {
      name: "Chilli",
      price: 0,
    },
  ];

  const addItem = (id, qty) => {
    const menuItem = menu[id];

    const existingItemIndex = orderList.findIndex(
      (item) => item.name === menuItem.name
    );

    if (existingItemIndex !== -1) {
      const updatedOrderList = [...orderList];
      updatedOrderList[existingItemIndex].quantity += qty;
      setOrderList(updatedOrderList);
    } else {
      const newItem = { name: menuItem.name, quantity: qty };
      setOrderList([...orderList, newItem]);
    }
  };

  const deleteItem = (index) => {
    const updatedOrderList = [...orderList];

    updatedOrderList.splice(index, 1);
    setOrderList(updatedOrderList);
  };

  const handleSubmit = () => {
    dispatch(
      addMealsToBooking({
        bookingId: storedBooking.bookingId,
        meals: orderList,
      })
    );
    Swal.fire({
      title: "Success!",
      text: "Meals Added Successfully",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      storedBooking.meals = orderList;
      localStorage.setItem("booking", JSON.stringify(storedBooking));
      setShowMeal(false);
      setShowLuggage(true);
      setShowSeat(false);
    });
  };

  return (
    <>
      <div className="flex mt-5 container mx-auto md:flex-row flex-col">
        <section className="md:w-1/2 bg-gray-50 md:mr-4 border border-gray-300 rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-4">Order(s)</h2>
          {orderList.length > 0 ? (
            <table className="w-full">
              <thead className="bg-lightyellow text-white font-bold ">
                <tr>
                  <th className="border-b px-4 py-2">#</th>
                  <th className="border-b px-4 py-2">Name</th>
                  <th className="border-b px-4 py-2">Quantity</th>
                  <th className="border-b px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {orderList.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b px-4 py-2">{index + 1}</td>
                    <td className="border-b px-4 py-2">{item.name}</td>
                    <td className="border-b px-4 py-2">{item.quantity}</td>
                    <td className="border-b px-4 py-2">
                      <button
                        onClick={() => deleteItem(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <i className="fa fa-trash text-red-500"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">Your order list is empty</p>
          )}
        </section>
        <section className="md:w-1/2 bg-gray-50 border border-gray-300 rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-4">Menu</h2>
          <div className="menu">
            {menu.map((item, index) => (
              <div
                className="menu-item border-b border-gray-300 pb-2 mb-2 flex justify-between items-center"
                key={index}
              >
                <div>
                  <h4 className="text-sm">{item.name}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-gray-600">
                    {item.price === 0 ? "Free" : `${item.price}k`}
                  </p>
                  <button
                    className="add-btn text-sm py-1 px-2 bg-green-500 text-white border border-green-600 rounded cursor-pointer"
                    onClick={() => addItem(index, 1)}
                  >
                    ADD
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="flex items-center justify-center mt-8 md:gap-40 gap-5">
        <button
          onClick={() => {
            setShowMeal(false);
            setShowLuggage(false);
            setShowSeat(true);
          }}
          className="py-2 px-4 mb-6 bg-greyblue rounded-sm
                font-medium text-white uppercase
                focus:outline-none hover:bg-greyblue hover:shadow-none"
          type="submit"
        >
          <i className="fa fa-solid fa-backward"></i>
        </button>
        <button
          onClick={handleSubmit}
          className="py-2 px-4 mb-6 bg-greyblue rounded-sm
              font-medium text-white uppercase
              focus:outline-none hover:bg-greyblue hover:shadow-none"
          type="submit"
        >
          Save Meals
        </button>
        {/* <button
          onClick={() => {
            setShowMeal(false);
            setShowLuggage(true);
            setShowSeat(false);
          }}
          className="py-2 px-4 mb-6 bg-greyblue rounded-sm
                font-medium text-white uppercase
                focus:outline-none hover:bg-greyblue hover:shadow-none"
          type="submit"
        >
          <i className="fa fa-solid fa-forward"></i>
        </button> */}
      </div>
    </>
  );
};

export default Meal;
