import { ProductCardContainer, ImgProd, Footer, Name, Price } from './product-card.styles';

import { addItemToCart } from '../../store/cart/cart.action';

import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

const ProductCard = ({ product }) => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const { name, price, imageUrl } = product;

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCardContainer>
      <ImgProd src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
    </ProductCardContainer>
  );
};

export default ProductCard;