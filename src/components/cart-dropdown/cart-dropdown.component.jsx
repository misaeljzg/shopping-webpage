import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component'

import CartItem from '../cart-item/cart-item.component';

import {CartDropdownContainer, CartItems} from './cart-dropdown.styles';
import { selectCartItems } from '../../store/cart/cart.selector';

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
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