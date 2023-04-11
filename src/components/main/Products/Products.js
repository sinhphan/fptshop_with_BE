import { memo, useCallback, useContext, useState } from "react"
import { FilterContext } from "../Main"

import Product from "./Product"
import ProductNotFound from "./ProductNotFound"
import ProductsFilterNavigation from "./ProductsFilterNavigation"
import ViewMoreButton from "./ViewMoreButton"

function Products() {
  const productData = useContext(FilterContext)
  const [isGridDisplay, setGridDisplay] = useState(true)

  const handleGridButtonClick = useCallback(() => setGridDisplay(true), [isGridDisplay])
  const handleListButtonClick = useCallback(() => setGridDisplay(false), [isGridDisplay])

  const totolProuctsFiltered = productData.listDefault.list.length

  return (
    <div className="products">
      {totolProuctsFiltered !== 0 &&
        <ProductsFilterNavigation
          gridBtnOnClick={handleGridButtonClick}
          listBtnOnClick={handleListButtonClick}
          isGridDisplay={isGridDisplay}
        />
      }

      {totolProuctsFiltered !== 0 &&
        (<div className="product-list flex">
          {productData.listDefault.list.map((e, id) => {
            // get list attributes specifie item by product id
            const attributeSpecItems = productData.attributeSpecItems.filter(
              (attr) => attr.productID == e.id
            )

            const skus = productData.promotionItems.filter(promotion => promotion.sku == e.productVariant.sku)

            return <Product
              product={e}
              key={id}
              attrs={attributeSpecItems}
              promotionItems={skus}
              isGridDisplay={isGridDisplay}
            />
          })}
        </div>)
      }

      {totolProuctsFiltered === 0 && <ProductNotFound />}
      {totolProuctsFiltered >= 27 && <ViewMoreButton />}
    </div>
  )
}

export default Products = memo(Products)