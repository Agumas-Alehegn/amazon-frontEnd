import React, { useState } from "react";
import classes from "./payment.module.css";
import LayOut from "../../LayOut/LayOut";
import { DataContext } from "../../DataProvider/DataProvider";
import { useContext } from "react";
import ProductsCard from "../../Product/ProductsCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import FormatCurrency from "../../CurrencyFormat/FormatCurrency";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ cart, user }, dispatch] = useContext(DataContext);
  const totalQuantity = cart?.reduce((quantity, item) => {
    return item.quantity + quantity;
  }, 0);
  const total = cart.reduce((quantity, item) => {
    return item.price * item.quantity + quantity;
  }, 0);
  const [cardError, setCardError] = useState(null);
  const [cardProcessing, setCardProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const handleChanges = (e) => {
    e.error?.message ? setCardError(e.error.message) : setCardError(null);
  };
  const handlePayment = async (e) => {
    e.preventDefault();

    //contact backend  to get the client secret
    try {
      setCardProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      const clientSecret = response.data?.clientSecret;
      //confirm the payment
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      // after the confirmation, saving order in  database and clear  the cart
      await setDoc(
        doc(
          collection(collection(db, "users"), user.uid, "orders"),
          paymentIntent.id
        ),
        {
          cart: cart,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }
      );
      // empty the cart after order made
      dispatch({ type: Type.Clear_Cart });

      setCardProcessing(false);
      navigate("/Order", {
        state: { msg: "You have placed a new order successfully" },
      });
      // Redirect to success page
    } catch (error) {
      console.log(error);
      setCardProcessing(false);
    }
  };
  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment_header}>
        Checkout ({totalQuantity})items
      </div>
      {/* payment */}
      <section className={classes.Payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>ET047 My st.</div>
            <div>Bole, Addis Ababa</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review products and delivery</h3>
          <div className={classes.checkOut_product}>
            {cart?.map((item, i) => (
              <ProductsCard key={i} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form  */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                <CardElement onChange={handleChanges} />
                {cardError && (
                  <small
                    style={{
                      color: "salmon",
                      fontSize: "12px",
                    }}
                  >
                    {cardError}
                  </small>
                )}
                {/* price summary */}
                <div className={classes.payment_price}>
                  <div>
                    <p>Total order | {totalQuantity} Items</p>
                    <span>
                      <p> Total</p>
                      <FormatCurrency quantity={total} />
                    </span>
                  </div>

                  <button type="submit">
                    {cardProcessing ? (
                      <div className={classes.card_loading}>
                        <ClipLoader color="gray" size={15} />
                        <p>Please wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
