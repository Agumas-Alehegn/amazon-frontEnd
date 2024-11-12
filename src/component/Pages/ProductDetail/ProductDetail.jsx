import React, { useEffect, useState } from "react";
import classes from "./productDetail.module.css";
import LayOut from "../../LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductsCard from "../../Product/ProductsCard.jsx";
import Loading from "../../Loader/Loading.jsx";

function ProductDetail() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { productId } = useParams();
  console.log(productId);
  // This will print the productId received from the URL;
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);
  console.log(product);
  return (
    <LayOut>
      {isLoading ? (
        <Loading />
      ) : (
        <ProductsCard
          product={product}
          flex={true}
          renderDesc={true}
          productCategory={true}
          renderCartBtn={true}
        />
      )}
    </LayOut>
  );
}

export default ProductDetail;
