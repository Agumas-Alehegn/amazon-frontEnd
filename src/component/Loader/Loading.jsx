import React from "react";
import { ScaleLoader } from "react-spinners";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <ScaleLoader />
    </div>
  );
}

export default Loading;
