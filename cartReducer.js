import { ADD_TO_CART, REMOVE_FROM_CART, CALCULATE_TOTAL } from "./actions";

const initialState = { cart: [] };

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((c) => c.id != action.payload),
      };
    case CALCULATE_TOTAL:
      const totalPrice = state.cart.reduce((acc, curr) => acc + curr.price, 0);
      return {
        ...state,
        total: totalPrice,
      };
    default:
      return state;
  }
};

export default cartReducer;
