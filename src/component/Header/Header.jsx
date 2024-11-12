import React, { useContext } from "react";
import classes from "./header.module.css";
import { CiLocationOn } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import cartIcon from "../../assets/images/cart-icon.png";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../Utility/firebase";

function Header() {
  const [{ user, cart }, dispatch] = useContext(DataContext);
  // console.log(cart.length);
  const totalQuantity = cart?.reduce((quantity, item) => {
    return item.quantity + quantity;
  }, 0);
  return (
    <section className={classes.fixed_position}>
      <div className={classes.header_container}>
        <div className={classes.header_container_left}>
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/small/amazon_PNG25.png"
              alt=""
            />
          </Link>
          <Link to="" className={classes.delivery_wrap}>
            <CiLocationOn />
            <div className={classes.delivery_destination}>
              <p>Deliver to</p>
              <span>Ethiopia</span>
            </div>
          </Link>
        </div>
        <div className={classes.header_container_middle}>
          <select name="" className={classes.select_category}>
            <option value="All" defaultChecked>
              All Departments
            </option>
            <option value="Arts & Crafts">Arts & Crafts</option>
            <option value="Automotive">Automotive</option>
            <option value="Baby">Baby</option>
            <option value="Beauty & personal Care">
              Beauty & personal Care
            </option>
            <option value="Books">Books</option>
            <option value="Boy's Fashion">Boy's Fashion</option>
            <option value="Computers">Computers</option>
            <option value="Deals">Deals</option>
            <option value="Digital Music">Digital Music</option>
            <option value="Electronics">Electronics</option>
            <option value="Girl's Fashion">Girl's Fashion</option>
            <option value="Health & HouseHold">Health & HouseHold</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Industrial & Scientific">
              Industrial & Scientific
            </option>
            <option value="Kindle Store">Kindle Store</option>
            <option value="Luggage">Luggage</option>
            <option value="Men's Fashion">Men's Fashion</option>
            <option value="Movies & TV">Movies & TV</option>
            <option value="Music, CD's & Vinyl">Music, CD's & Vinyl</option>
          </select>
          <input type="text" placeholder="Search Amazon" />
          <button>
            <FaSearch />
          </button>
        </div>
        <div className={classes.header_container_right}>
          <Link to="" className={classes.language_wrap}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/383px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png"
              alt=""
            />
            <span className={classes.language}>
              EN
              <sub>
                <FaCaretDown />
              </sub>
            </span>
          </Link>

          <Link to={!user && "/Auth"} className={classes.signIn_wrap}>
            {user ? (
              <>
                <span>Hello, {user?.email?.split("@")[0]}</span>
                <p onClick={() => auth.signOut()}>
                  SignOut
                  <sub>
                    <FaCaretDown />
                  </sub>
                </p>
              </>
            ) : (
              <>
                <span>Hello, Sign in</span>
                <p>
                  Accounts & Lists
                  <sub>
                    <FaCaretDown />
                  </sub>
                </p>
              </>
            )}
          </Link>
          <Link to="/Order" className={classes.orders}>
            <span>Returns</span> <br />
            <p>& Orders</p>
          </Link>
          <Link to="/Cart" className={classes.cart}>
            <img src={cartIcon} alt="" />
            <span>Cart</span>
            <span className={classes.cart_quantity}>{totalQuantity}</span>
          </Link>
        </div>
      </div>
      <LowerHeader />
    </section>
  );
}

export default Header;
