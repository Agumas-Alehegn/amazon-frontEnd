import React, { useContext, useState } from "react";
import classes from "./cart.module.css";
import LayOut from "../../LayOut/LayOut";
import { DataContext } from "../../DataProvider/DataProvider";
import ProductCard from "../../Product/ProductsCard";
import FormatCurrency from "../../CurrencyFormat/FormatCurrency";
import { Link } from "react-router-dom";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Type } from "../../Utility/action.type";

function Cart() {
  const [{ cart }, dispatch] = useContext(DataContext);
  const total = cart.reduce((quantity, item) => {
    return item.price * item.quantity + quantity;
  }, 0);
  const increment = (item) => {
    dispatch({
      type: Type.AddTo_Cart,
      item,
    });
  };
  const decrement = (id) => {
    dispatch({
      type: Type.RemoveFrom_Cart,
      id,
    });
  };

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h3>Your Cart</h3>
          <hr />
          {cart?.length === 0 ? (
            <p>Opps! Your Amazon Cart is empty.</p>
          ) : (
            cart.map((item, i) => {
              return (
                <>
                  <ProductCard
                    key={i}
                    product={item}
                    flex={true}
                    renderDesc={true}
                    renderCartBtn={false}
                  ></ProductCard>
                  <div className={classes.btn_wrap}>
                    Quantity:{"  "}
                    <button
                      className={classes.btn}
                      onClick={() => increment(item)}
                    >
                      <IoMdArrowDropup />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className={classes.btn}
                      onClick={() => decrement(item.id)}
                    >
                      <IoMdArrowDropdown />
                    </button>
                  </div>
                </>
              );
            })
          )}
        </div>
        {cart?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal: ({cart?.length} Items)</p>
              <FormatCurrency quantity={total} />
            </div>
            <span>
              <input type="checkbox" name="" id="" />
              <small>This order Contains a gift</small>
            </span>
            <Link to="/Payment">Continue to Check out</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
