import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  //find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id);

  //If found, increment quantity

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  //return new array with modified cartItems / new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, productToRemove) => {

  const itemIndex = cartItems.findIndex(
    (cartItem) => cartItem.id === productToRemove.id);

  return cartItems.filter(item => item.id != productToRemove.id);
}

const reduceItemQuantity = (cartItems, productToReduce) => {
  // Find the cart item to reduce
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToReduce.id);
  //Check if quantity is equal to 1, if it is remove that item freom the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(item => item.id !== productToReduce.id);
  }
  //Return back cart items with matching cart item with reduced quantity
  return cartItems.map((cartItem) => 
    cartItem.id === productToReduce.id
    ? {...cartItem, quantity: cartItem.quantity - 1}
    : cartItem
  )
}

//as the actual value you want to access
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  cartCount: 0,
  removeItemFromCart: () => { },
  reduceItemQuantityFromCart: () => { },
  total: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const totalCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
    setTotal(totalCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  }

  const reduceItemQuantityFromCart = (productToReduce) => {
    setCartItems(reduceItemQuantity(cartItems, productToReduce));
  }

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, reduceItemQuantityFromCart, total };
  return (<CartContext.Provider value={value}>{children}</CartContext.Provider>)
}