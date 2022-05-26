import ProductCard from '../../components/product-card/product-card.component';

import { useContext, useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { CategoriesContext } from '../../contexts/categories.context';

import {CategoryContainer, CategoryTitle} from './category.styles'

const Category = () => {
  const { category } = useParams();

  const { categoriesMap } = useContext(CategoriesContext);

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);


  return (
    <>
    <CategoryTitle className='category-title'>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products &&
          products.map((product) => <ProductCard key={product.id} product={product} />)
        }
      </CategoryContainer>
    </>
  )
};

export default Category;