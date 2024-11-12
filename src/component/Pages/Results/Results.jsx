import React, { useEffect, useState } from "react";
import classes from "./results.module.css";
import LayOut from "../../LayOut/LayOut";
import { useParams } from "react-router-dom";
import { productUrl } from "../../Api/endPoints.js";
import axios from "axios";
import ProductsCard from "../../Product/ProductsCard";
import Loading from "../../Loader/Loading.jsx";

function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { categoryName } = useParams();

  console.log(categoryName);

  useEffect(() => {
    // fetch data from the API
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        console.log(res);
        setResults(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        console.error("Error fetching products:", err);
        setIsLoading(false);
      });
  }, []);
  console.log(results);
  return (
    <LayOut>
      {isLoading ? (
        <Loading />
      ) : (
        <section>
          <h2 style={{ padding: "30px 0px 0px 30px " }}>Results:</h2>
          <p
            style={{
              padding: "10px 0  10px 30px",
              fontSize: "20px",
              fontWeight: "lighter",
            }}
          >
            Category / {categoryName}
          </p>
          <hr />
          <div className={classes.products_container}>
            {results.map((singleProduct) => {
              return (
                <ProductsCard
                  key={singleProduct.id}
                  product={singleProduct}
                  renderCartBtn={true}
                />
              );
            })}
          </div>
        </section>
      )}
    </LayOut>
  );
}

export default Results;
