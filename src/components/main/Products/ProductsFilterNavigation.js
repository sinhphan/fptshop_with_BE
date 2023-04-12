import { memo, useContext, useEffect, useRef, useState } from 'react';

import { FilterContext, FilterDispatchContext } from '../Main';
import * as actions from '../../../logic/filter_reducer/actions';

const listFilterProps = [
  {
    name: 'Bán chạy nhất',
    query: 'sort',
    queryValue: 'best_sell',
    action: actions.bestSellingFilterAction,
  },
  {
    name: 'Trả góp 0%',
    query: 'zero',
    queryValue: 'Trả góp 0%',
    action: actions.zeroPercentPaymentFilterAction,
  },
  {
    name: 'Giá thấp',
    query: 'sort',
    queryValue: 'low_price',
    action: actions.lowPriceFilterAction,
  },
  {
    name: 'Giá cao',
    query: 'sort',
    queryValue: 'hight_price',
    action: actions.highPriceFilterAction,
  },
  {
    name: 'Ưu đãi online',
    queryValue: 'best_sell',
    query: 'sort',
    action: actions.onlineOfferFilterAction,
  },
];

function ProductsFilterNavigation({
  gridBtnOnClick,
  listBtnOnClick,
  isGridDisplay,
}) {
  const filterDispatch = useContext(FilterDispatchContext);
  const data = useContext(FilterContext);
  const [filterActiveId, setFilterActiveId] = useState(0);
  const dropdownContent = useRef();

  let rightFilterText = listFilterProps[filterActiveId].name;

  let gridBtnCss = isGridDisplay ? 'icon-th-layout active' : 'icon-th-layout';
  let listBtnCss = isGridDisplay ? 'icon-th-list' : 'icon-th-list active';

  const handleChoseFilter = async (e) => {
    let id = +e.currentTarget.dataset.id;
    const url = `${data.url}${listFilterProps[id].query}=${listFilterProps[id].queryValue}`;
    setFilterActiveId(id);
    await fetch(url)
      .then((res) => res.json())
      .then((fetchedData) => {
        fetchedData.url = data.url;
        fetchedData.page = 1;
        filterDispatch(listFilterProps[id].action(fetchedData));
      });
  };

  const handleDropdownClick = (e) => {
    dropdownContent.current.classList.toggle('show');
  };

  useEffect(() => {
    dropdownContent.current.classList.remove('show');
  }, [data]);

  return (
    <div className="product-filter flex js-between">
      <div className="product-filter-list flex ali-center">
        <p className="only-pc">Ưu tiên xem:</p>
        <div className="flex">
          {listFilterProps.map((e, i) => {
            let buttonActiveCss = i === filterActiveId ? 'active' : '';
            return (
              <button
                className={buttonActiveCss}
                key={i}
                onClick={handleChoseFilter}
                data-id={i}
              >
                {e.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="product-filter-display flex ali-center js-end only-pc">
        <div>
          <div
            className="click-dropdown ddtype-list relative"
            onClick={handleDropdownClick}
          >
            <button>{rightFilterText}</button>
            <ul className="dropdown-content" ref={dropdownContent}>
              {listFilterProps.map((e, i) => {
                let filterActiveCss = i === filterActiveId ? 'active' : '';
                return (
                  <li
                    className={filterActiveCss}
                    key={i}
                    data-id={i}
                    onClick={handleChoseFilter}
                  >
                    {e.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <span className={gridBtnCss} onClick={gridBtnOnClick}></span>
        <span className={listBtnCss} onClick={listBtnOnClick}></span>
      </div>
    </div>
  );
}

export default ProductsFilterNavigation = memo(ProductsFilterNavigation);
