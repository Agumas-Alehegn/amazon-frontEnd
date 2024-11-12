import React, { useContext, useEffect } from "react";
import "./index.css";
import Routing from "./Routing";
import { DataContext } from "./component/DataProvider/DataProvider";
import { Type } from "./component/Utility/action.type";
import { auth } from "./component/Utility/firebase";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.Set_User,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.Set_User,
          user: null,
        });
      }
      // unsubscribe on unmount
    });
  }, []);

  return <Routing />;
}

export default App;
