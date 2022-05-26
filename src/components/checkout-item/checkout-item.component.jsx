import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import {CheckoutItemContainer, ImageContainer, Img,Strings, Quantity, Arrow, RemoveButton, Value} from './checkout-item.styles'


const CheckoutItem = ({cartItem}) => {
  const { addItemToCart, removeItemFromCart, reduceItemQuantityFromCart } = useContext(CartContext);
  const {name, imageUrl, price, quantity} = cartItem;

  const removeItemHandler = () => removeItemFromCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const reduceItemHandler = () => reduceItemQuantityFromCart(cartItem);

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