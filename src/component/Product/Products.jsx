import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductsCard from "./ProductsCard";
import classes from "./products.module.css";
import Loading from "../Loader/Loading";

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        console.log(res);
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err) {
          console.log("Error fetching products", err);
        }
        isLoading(false);
      });
  }, []);
  console.log(products);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className={`${classes.products_container}`}>
          {products.map((singleProduct) => (
            <ProductsCard
              key={singleProduct.id}
              product={singleProduct}
              renderCartBtn={true}
            />
          ))}
        </section>
      )}
    </>
  );
}

export default Products;
