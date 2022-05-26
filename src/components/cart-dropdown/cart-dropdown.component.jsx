import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component'

import CartItem from '../cart-item/cart-item.component';

import {CartDropdownContainer, CartItems} from './cart-dropdown.styles';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout')
  }

  return (
    <CartDropdownContainer>
      <CartItems>
        {
          cartItems.length ? (
            cartItems.map((item) => (
              <CartItem key={item.id} cartItem={item} />
            ))
          ) : (
            <span>Your cart is empty</span>
          )
        }
        
        <Button onClick={goToCheckoutHandler}>Go to checkout</Button>
      </CartItems>
    </CartDropdownContainer>
  )
}

export default CartDropdown;