import { ActionWithPayload, createAction, withMatcher } from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES, CartItem } from './cart.types';
import { CategoryItem } from '../categories/category.types';

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

const removeCartItem = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {

  const itemIndex = cartItems.findIndex(
    (cartItem) => cartItem.id === productToRemove.id);

  return cartItems.filter(item => item.id != productToRemove.id);
}

const reduceItemQuantity = (cartItems: CartItem[], productToReduce: CartItem): CartItem[] => {
  // Find the cart item to reduce
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToReduce.id);
  //Check if quantity is equal to 1, if it is remove that item freom the cart
  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter(item => item.id !== productToReduce.id);
  }
  //Return back cart items with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === productToReduce.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;



export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));

export const setCartItems = withMatcher((cartItems: CartItem[]):
  SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
}

export const removeItemFromCart = (cartItems: CartItem[], productToRemove: CartItem) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return setCartItems(newCartItems);
}

export const reduceItemQuantityFromCart = (cartItems: CartItem[], productToReduce: CartItem) => {
  const newCartItems = reduceItemQuantity(cartItems, productToReduce);
  return setCartItems(newCartItems);
}