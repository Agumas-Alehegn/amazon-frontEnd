import React, { useContext, useEffect, useState } from "react";
import classes from "./orders.module.css";
import LayOut from "../../LayOut/LayOut";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../DataProvider/DataProvider";
import ProductsCard from "../../Product/ProductsCard";

function Order() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [order, setOrder] = useState([]);

  const fetchOrders = async (userId) => {
    // const ordersRef = collection(db, "users", userId, "orders");
    const ordersRef = query(
      collection(db, "users", userId, "orders"),
      orderBy("created", "desc")
    );
    // const q = query(ordersRef, orderBy("created", "desc"));
    const querySnapshot = await getDocs(ordersRef);
    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return orders;
  };

  useEffect(() => {
    if (user) {
      // Fetch orders for the current user
      fetchOrders(user.uid)
        .then((orders) => setOrder(orders))
        .catch((error) => console.log("Error fetching orders: ", error));
    } else {
    }
  }, []);
  return (
    <LayOut>
      <section className={classes.order_section_container}>
        <div>
          <h2>Your orders</h2>
          {order?.length === 0 && <p>You have no orders yet.</p>}
          <div className={classes.orders_container}>
            {order?.map((singleOrder) => (
              <div className={classes.orders} key={singleOrder.id}>
                <p>
                  <span>Order Id: </span> {singleOrder?.id}
                </p>
                {singleOrder?.cart?.map((cartItem, id) => {
                  return (
                    <ProductsCard key={id} product={cartItem} flex={true} />
                  );
                })}
                <hr />
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Order;
