import { memo, useContext } from 'react';
import { IMG_CUSTOMER_NEED_THUMB } from '../../../config/globalConfigs';
import { FilterContext } from '../Main';
import { data } from '../../../asset/data';

function FilterByCustomerNeed() {
  const listFilterByCustomer = data.navFilterAttributeItem.specItems.filter(
    (e) => e.attributeID === 133
  );

  return (
    <div className="filter main-content-wrap">
      <h3>Laptop theo nhu cầu</h3>
      <div className="flex">
        {listFilterByCustomer.map((listFilter, i) => {
          return (
            <div className="l-1-5 c-6 filter-keyword" key={i}>
              <div className="c-12 flex js-center">
                <img
                  src={`${IMG_CUSTOMER_NEED_THUMB}${listFilter.urlPicture}`}
                  alt=""
                />
              </div>
              <div className="c-12 flex js-center">
                <p>{listFilter.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FilterByCustomerNeed = memo(FilterByCustomerNeed);
