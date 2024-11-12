import { Type } from "./action.type";

export const initialState = {
  cart: [],
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.AddTo_Cart:
      // check if the item exists
      const existingItem = state.cart.find(
        (item) => item.id === action.item.id
      );
      // if it doesn't, add the item to the cart
      // if it does, increase the quantity
      if (!existingItem) {
        return {
          ...state,
          cart: [...state.cart, { ...action.item, quantity: 1 }],
        };
      } else {
        const updatedCart = state.cart.map((item) => {
          return item.id === action.item.id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
        return { ...state, cart: updatedCart };
      }
    // defining the decrement action as second case
    case Type.RemoveFrom_Cart:
      // check the existence of an item in the cart
      const index = state.cart.findIndex((item) => item.id === action.id);
      // good practice make a shallow copy of the cart
      let newCart = [...state.cart];
      // if the item exists, remove it from the cart
      if (index >= 0) {
        if (newCart[index].quantity > 1) {
          newCart[index] = {
            ...newCart[index],
            quantity: newCart[index].quantity - 1,
          };
        } else {
          newCart.splice(index, 1);
        }
      }
      return {
        ...state,
        cart: newCart,
      };
    case Type.Clear_Cart:
      return {
        ...state,
        cart: [],
      };

    case Type.Set_User:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};
