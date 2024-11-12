import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import FormatCurrency from "../CurrencyFormat/FormatCurrency.jsx";
import classes from "./products.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider.jsx";
import { Type } from "../Utility/action.type.js";

function ProductsCard({
  product,
  flex,
  productCategory,
  renderDesc,
  renderCartBtn,
}) {
  const { id, title, price, image, rating, description, category } = product;
  const [state, dispatch] = useContext(DataContext);

  console.log(state);
  const addToCart = () => {
    dispatch({
      type: Type.AddTo_Cart,
      item: {
        id,
        title,
        price,
        image,
        rating,
        description,
        category,
      },
    });
  };

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`products/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <div className={classes.description_wrap}>
        <div>
          {productCategory && (
            <h2 style={{ padding: "10px 0" }}>Category/{category}</h2>
          )}
          <h3>{title}</h3>
          {renderDesc && <p style={{ maxWidth: "750px" }}>{description}</p>}
        </div>
        <div className={`${classes.rating}`}>
          <Rating value={rating?.rate} precision={0.1} />
          <small>{rating?.count}</small>
        </div>
        <div>
          <FormatCurrency quantity={price} />
        </div>
        {renderCartBtn && (
          <button className={`${classes.button}`} onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
export default ProductsCard;
