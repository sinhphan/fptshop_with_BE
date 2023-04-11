import { memo, useContext } from "react";
import { createInitCheckedItems } from "../../../config/createInitCheckedItems";
import { CheckedItemsContext, FilterContext, SetCheckedItemsContext } from "../Main";

function MainContentFilteredList() {
  let filteredProducts = useContext(FilterContext)
  let checkedItems = useContext(CheckedItemsContext)
  let setCheckedItems = useContext(SetCheckedItemsContext)

  let productQuantity = filteredProducts.listDefault.list.length
  let isBrandCategory = checkedItem => checkedItem.id !== -1 && checkedItem.parentOrder === -1
  let isPriceCategory = checkedItem => checkedItem.id !== -1 && checkedItem.parentOrder === 0
  let isScreenSizeCategory = checkedItem => checkedItem.id !== -1 && checkedItem.parentOrder === 1

  let listBrand = checkedItems.filter(isBrandCategory)
  let listPrice = checkedItems.filter(isPriceCategory)
  let listScreenSize = checkedItems.filter(isScreenSizeCategory)

  let brandName = listBrand.length === 1 ? listBrand[0].name : ''
  let price = listPrice.length === 1 ? listPrice[0].name : ''
  let screenSize = listScreenSize.length === 1 ? listScreenSize[0].name : ''

  let userCheckedItems = checkedItems.filter(e => e.id != -1)
  let totalCheckedItemMoreThanOne = userCheckedItems.length >= 2

  const handleDeleteFilter = (e) => {
    let listDataset = e.currentTarget.dataset
    let initCheckedItems = createInitCheckedItems()

    if (listDataset.type === 'all') {
      setCheckedItems(initCheckedItems)
    } else {
      let isNotDeleteCheckedItem = e => !(e.id === +listDataset.id && e.parentOrder === +listDataset.parentOrder)
      let newCheckedItems = checkedItems.filter(isNotDeleteCheckedItem)
      let parentOfDeletedHasChildren = newCheckedItems.filter(e =>
        e.parentOrder === +listDataset.parentOrder
      ).length > 0

      if (!parentOfDeletedHasChildren) {
        let initCheckedItemOfthisParent = {
          id: -1,
          parentName: listDataset.parentName,
          searchKey: '',
          name: '',
          parentOrder: +listDataset.parentOrder,
        }
        newCheckedItems.push(initCheckedItemOfthisParent)
      }
      setCheckedItems(newCheckedItems)
    }
  }

  return (
    <div className="main-content-filter-list" id='products'>
      <div className="main-content-filter-list-header flex ali-center">
        <h3>Laptop {brandName} {price} {screenSize}</h3>
        <span>
          ( {productQuantity} sản phẩm )
        </span>
      </div>
      <div className="main-content-filter-list-content flex">
        <p >Lọc theo: </p>
        {userCheckedItems.map((checkedItem, id) => {
          return (
            <span
              className='list-filter'
              data-type='one'
              data-id={checkedItem.id}
              data-parent-order={checkedItem.parentOrder}
              data-parent-name={checkedItem.parentName}
              key={id}
              onClick={handleDeleteFilter}
            >
              {checkedItem.name}
              <i className="icon-cancel"></i>
            </span>
          )
        })}

        {totalCheckedItemMoreThanOne && (
          <span
            className='list-filter'
            data-type='all'
            onClick={handleDeleteFilter}
          >
            Xóa tất cả
            <i className="icon-cancel"></i>
          </span>
        )}
      </div>
    </div>
  )
}

export default MainContentFilteredList = memo(MainContentFilteredList)