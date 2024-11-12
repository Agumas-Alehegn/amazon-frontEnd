import React from "react";
import numeral from "numeral";
const FormatCurrency = ({ quantity }) => {
  const formattedAmount = numeral(quantity).format("$0, 0.00");
  return <div>Price: {formattedAmount}</div>;
};

export default FormatCurrency;
