import { createStore } from "redux";
import cartReducer from "./cartReducer";
import { addCart, removeFromCart, calculateTotal } from "./actions";

const store = createStore(
  cartReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

store.subscribe(() => {
  updateCart();
});

const productList = document.querySelector("#productList");
const cartList = document.querySelector("#cartList");
const totalPrice = document.querySelector("#totalPrice");

const products = [
  { id: 1, name: "Product A", price: 10 },

  { id: 2, name: "Product B", price: 20 },

  { id: 3, name: "Product C", price: 15 },
];

window.addToCartBtn = (index) => {
  const product = products[index];
  store.dispatch(addCart(product));
  store.dispatch(calculateTotal());
};

const renderProducts = (products) => {
  productList.innerHTML = products
    .map(
      (product, index) =>
        `<li key="${product.id}">${product.name} - Rs.${product.price}<button onClick="addToCartBtn(${index})">Add to cart</button></li>`,
    )
    .join("");
};

window.removeCartHandler = (productId) => {
  store.dispatch(removeFromCart(productId));
  store.dispatch(calculateTotal());
};

const updateCart = () => {
  const state = store.getState();
  console.log(state);
  cartList.innerHTML = state.cart
    .map(
      (c) =>
        `<li key="${c.id}">${c.name} - Rs.${c.price} - Quantity: <button onClick="removeCartHandler(${c.id})">Remove</button></li>`,
    )
    .join("");

  totalPrice.textContent = state.total;
};

updateCart();

renderProducts(products);
