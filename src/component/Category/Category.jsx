import React from "react";
import CategoryCard from "./CategoryCard";
import { categoryData } from "./categoryData";
import classes from "./category.module.css";

function Category() {
  return (
    <section className={classes.category_container}>
      {categoryData.map((info, i) => {
        return <CategoryCard key={i} data={info}  />;
      })}
    </section>
  );
}

export default Category;
