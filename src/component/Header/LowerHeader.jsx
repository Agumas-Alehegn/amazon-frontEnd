import React from "react";
import classes from "./header.module.css";
import { AiOutlineMenu } from "react-icons/ai";

function LowerHeader() {
  return (
    <>
      <div className={classes.lower_header_container}>
        <ul>
          <li className={classes.hamburger_menu}>
            <AiOutlineMenu size={20} />
            <span> All</span>
          </li>
          <li>Today's Deals</li>
          <li>Customer Service</li>
          <li>Registry</li>
          <li>Gift Cards</li>
          <li>Sell</li>
        </ul>
      </div>
    </>
  );
}

export default LowerHeader;
