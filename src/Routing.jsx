import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./component/Pages/Landing/Landing";
import Auth from "./component/Pages/Auth/Auth";
import Payment from "./component/Pages/Payment/Payment";
import Order from "./component/Pages/Orders/Order";
import Cart from "./component/Pages/Cart/Cart";
import Results from "./component/Pages/Results/Results";
import ProductDetail from "./component/Pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
const stripePromise = loadStripe(
  "pk_test_51QD4sJ07p7DZlwGizbBn3y0YWlW6oCBpJABzeWit7Fw2OXKysiYWlGYxVTG9vHA8Uc768YDtxwvFg8X3Vr46XGVY00WAbcjWdX"
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/Auth" element={<Auth />} />

        <Route
          path="/Payment"
          element={
            <ProtectedRoute
              msg={"You have to login  to continue"}
              redirect={"/Payment"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />

        <Route
          path="/Order"
          element={
            <ProtectedRoute
              msg={"You have to login first to see your orders"}
              redirect={"/Order"}
            >
              <Order />
            </ProtectedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route
          path="/category/:categoryName/products/:productId"
          element={<ProductDetail />}
        />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/Cart" element={<Cart />} />

        {/* <Route path="*" element={NotFound} /> */}
      </Routes>
    </Router>
  );
}

export default Routing;
