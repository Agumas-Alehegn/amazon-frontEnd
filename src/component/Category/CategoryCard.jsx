import React, { useEffect, useState } from "react";
import classes from "./category.module.css";
import { Link } from "react-router-dom";

function CategoryCard({ data }) {
  console.log(data);

  return (
    <div className={classes.category}>
      <h2>{data?.title}</h2>
      <Link to={`/category/${data.name}`}>
        <img src={data?.imageLink} alt={data?.title} />
        <p>Shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
