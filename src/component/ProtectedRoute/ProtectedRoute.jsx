import React, { useContext, useEffect } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children, msg, redirect }) {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    if (!user) {
      navigate("/Auth", { state: { msg, redirect } });
    }
  }, [user]);
  return children;
}

export default ProtectedRoute;
