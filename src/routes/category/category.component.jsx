import ProductCard from '../../components/product-card/product-card.component';

import { useContext, useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import Spinner from '../../components/spinner/spinner.component'

import { useParams } from 'react-router-dom';

import { CategoryContainer, CategoryTitle } from './category.styles'
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';

const Category = () => {
  const { category } = useParams();

  const categoriesMap = useSelector(selectCategoriesMap);

  const isLoading = useSelector(selectCategoriesIsLoading);

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);


  return (
    <>
      <CategoryTitle className='category-title'>{category.toUpperCase()}</CategoryTitle>
      {
        isLoading ? (
          <Spinner />
        ) : (
          <CategoryContainer>
            {products &&
              products.map((product) => <ProductCard key={product.id} product={product} />)
            }
          </CategoryContainer>
        )
      }
    </>
  )
};

export default Category;