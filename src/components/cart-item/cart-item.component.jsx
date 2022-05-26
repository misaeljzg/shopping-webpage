import {CartItemContainer, ItemDetails, Name, ItemImage} from './cart-item.styles'

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;
  return (
    <CartItemContainer>
      <ItemImage src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <Name>{name}</Name>
        <span className='price'>{quantity} x ${price}</span>
      </ItemDetails>
    </CartItemContainer>
  );
}

export default CartItem;