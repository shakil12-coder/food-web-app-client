import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyOrder() {
  const [orderData, setOrderData] = useState({});
  //   console.log(localStorage.getItem("userEmail"));

  const fetchMyOrder = async () => {
    // console.log(localStorage.getItem("userEmail"));
    await fetch("https://food-web-app-server.onrender.com/api/myOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      console.log(response);
      setOrderData(response);
      console.log("data is : ", orderData);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  });

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="container">
        <div className="">
          {orderData !== {}
            ? Array(orderData).map((data) => {
                return data.orderData
                  ? data.orderData.order_data
                      .slice(0)
                      .reverse()
                      .map((item) => {
                        return item.map((arrayData) => {
                          return (
                            <>
                              <div className="">
                                {arrayData.order_date ? (
                                  <div className="m-auto mt-5">
                                    {(data = arrayData.order_date)}
                                    <hr />
                                  </div>
                                ) : (
                                  <div className="">
                                    <div
                                      className="card mt-3"
                                      style={{
                                        width: "16rem",
                                        maxHeight: "360px",
                                      }}
                                    >
                                      <div className="d-flex align-items-center justify-content-center">
                                        <div className="card-body">
                                          <h5 className="card-title">
                                            {arrayData.name}
                                          </h5>
                                          <div
                                            className="container w-100 p-0"
                                            style={{ height: "38px" }}
                                          >
                                            <span className="m-1">
                                              {arrayData.qty}
                                            </span>
                                            <span className="m-1">
                                              {arrayData.size}
                                            </span>
                                            <br />

                                            <span className="m-1">{data}</span>
                                            <br />
                                          </div>
                                        </div>
                                        <div
                                          style={{
                                            border: "solid",
                                            borderColor: "white",
                                            borderWidth: "0.5px",
                                            height: "80px",
                                          }}
                                        ></div>
                                        <div className=" d-inline ms-2 h-100 w-20 fs-5">
                                          ₹{arrayData.price}/-
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </>
                          );
                        });
                      })
                  : "";
              })
            : ""}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default MyOrder;
