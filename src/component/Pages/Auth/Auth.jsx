import React, { useState, useContext } from "react";
import classes from "./auth.module.css";
import LayOut from "../../LayOut/LayOut";
import amazon_logo from "../../../assets/images/amazon_logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import { Type } from "../../Utility/action.type";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../../component/DataProvider/DataProvider";
import { ClipLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signIn: false, signUp: false });
  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();

  const authHandler = async (e) => {
    e.preventDefault(e);
    if (e.target.name == "signIn") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.Set_User,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData.state?.redirect || "/");
        })
        .catch((err) => {
          if (err) {
            setError(err.message);
          }
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.Set_User,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(navStateData.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <LayOut>
      <section className={classes.login}>
        <Link to="/" className={classes.authPage_logo_wrap}>
          <img src={amazon_logo} alt="amazon logo" />
        </Link>{" "}
        <div className={classes.login_container}>
          <form action="">
            <h1>Sign in</h1>
            {navStateData?.state?.msg && (
              <small style={{ color: "salmon", textAlign: "center" }}>
                {navStateData?.state?.msg}
              </small>
            )}
            <div>
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                name="mail"
                id="email"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="pass"
                id="password"
              />
              {/* controlled input */}
              {/* if use userate it is uncontrolled input */}
            </div>
            {error && (
              <p
                style={{
                  border: "1px solid, salmon",
                  borderRadius: "5px",
                  padding: "5px",
                  backgroundColor: "pink",
                }}
              >
                {error}
              </p>
            )}
            <button
              onClick={authHandler}
              className={classes.btn_signIn}
              type="submit"
              name="signIn"
            >
              {loading.signIn ? (
                <ClipLoader size={20} color="#fff" />
              ) : (
                " Continue"
              )}
            </button>
          </form>
          <p>
            By continuing, you agree to Amazon-Clone
            <a href=""> Conditions of Use </a> and
            <a href=""> Privacy Notice.</a>
          </p>
          <div className={classes.new_to_amazon}>
            <hr />
            <span> New to Amazon?</span>
            <hr />
          </div>
          <button
            onClick={authHandler}
            className={classes.btn_create_account}
            type="submit"
            name="signUp"
          >
            {loading.signUp ? (
              <ClipLoader size={20} color="#de7921" />
            ) : (
              "Create your Amazon account"
            )}
          </button>
        </div>
      </section>
    </LayOut>
  );
}

export default Auth;
