import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';

import { setIsCartOpen } from '../../store/cart/cart.action';

import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';

import {CartIconContainer, ShoppingIconContainer, ItemCount} from './cart-icon.styles';

const CartIcon = () => {

  const dispatch = useDispatch();

  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIconContainer className='shopping-icon' />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;