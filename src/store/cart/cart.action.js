import { createAction } from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES } from './cart.types';

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
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}


export const setIsCartOpen = (boolean) => 
createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);


export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const reduceItemQuantityFromCart = (cartItems, productToReduce) => {
  const newCartItems = reduceItemQuantity(cartItems, productToReduce);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}