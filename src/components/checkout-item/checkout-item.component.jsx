import { addItemToCart, removeItemFromCart, reduceItemQuantityFromCart } from '../../store/cart/cart.action';

import {CheckoutItemContainer, ImageContainer, Img,Strings, Quantity, Arrow, RemoveButton, Value} from './checkout-item.styles'

import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';


const CheckoutItem = ({cartItem}) => {

  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);

  const {name, imageUrl, price, quantity} = cartItem;

  const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const reduceItemHandler = () => dispatch(reduceItemQuantityFromCart(cartItems, cartItem));

  return(
    <CheckoutItemContainer>
      <ImageContainer>
        <Img src={imageUrl} alt={`${name}`}/>
      </ImageContainer>
      <Strings>{name}</Strings>
      <Quantity>
        <Arrow onClick={reduceItemHandler}>
          &#10094;
        </Arrow>
        <Value> {quantity} </Value>
        <Arrow onClick={addItemHandler}>
          &#10095;
        </Arrow>
        </Quantity>
      <Strings>{price}</Strings>
      <RemoveButton onClick={removeItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem;