import React from "react";
// import trash from '../trash.svg'
import { useCart, useDispatchCart } from "../components/ContextReducer";
function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (!data || data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
      </div>
    );
  }
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    console.log("userEmail : ", userEmail);
    let response = await fetch(
      "https://food-web-app-server.onrender.com/api/orderData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      }
    );
    console.log("order response :", response);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };
  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md table-responsive-lg">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope>#</th>
              <th scope>Name</th>
              <th scope>Quantity</th>
              <th scope>Option</th>
              <th scope>Amount</th>
              <th scope></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <img
                      src={""}
                      alt="delete"
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5 " onClick={handleCheckOut}>
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
