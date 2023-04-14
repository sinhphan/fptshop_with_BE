import { memo, useCallback, useContext, useState } from 'react';
import { FilterContext } from '../Main';

import Product from './Product';
import ProductNotFound from './ProductNotFound';
import ProductsFilterNavigation from './ProductsFilterNavigation';
import ViewMoreButton from './ViewMoreButton';

function Products() {
  const productData = useContext(FilterContext);
  const [isGridDisplay, setGridDisplay] = useState(true);

  const handleGridButtonClick = useCallback(
    () => setGridDisplay(true),
    [isGridDisplay]
  );
  const handleListButtonClick = useCallback(
    () => setGridDisplay(false),
    [isGridDisplay]
  );

  const totalProductsFiltered = productData.listDefault.list.length;

  return (
    <div className="products">
      {totalProductsFiltered !== 0 && (
        <ProductsFilterNavigation
          gridBtnOnClick={handleGridButtonClick}
          listBtnOnClick={handleListButtonClick}
          isGridDisplay={isGridDisplay}
        />
      )}

      {totalProductsFiltered !== 0 && (
        <div className="product-list flex">
          {productData.listDefault.list.map((e, id) => {
            return (
              <Product product={e} key={id} isGridDisplay={isGridDisplay} />
            );
          })}
        </div>
      )}

      {totalProductsFiltered === 0 && <ProductNotFound />}
      {totalProductsFiltered >= 27 && <ViewMoreButton />}
    </div>
  );
}

export default Products = memo(Products);
