import { memo, useContext, useState } from 'react';
import { FilterContext, FilterDispatchContext } from '../Main';
import { filterAction } from '../../../logic/filter_reducer/actions';

function ViewMoreButton() {
  const data = useContext(FilterContext);
  const filterDispatch = useContext(FilterDispatchContext);
  const [noMore, setNoMore] = useState(false);
  let cssClass = noMore ? 'view_more_btn hide' : 'view_more_btn';

  const clickHandle = async () => {
    data.page += 1;
    const url = `${data.url}page=${data.page}`;

    await fetch(url)
      .then((res) => res.json())
      .then((fetchData) => {
        if (fetchData.listDefault.list.length > 0) {
          const newData = {
            ...data,
            listDefault: {
              list: [...data.listDefault.list, ...fetchData.listDefault.list],
            },
            attributeSpecItems: [
              ...data.attributeSpecItems,
              ...fetchData.attributeSpecItems,
            ],
            promotionItems: [
              ...data.promotionItems,
              ...fetchData.promotionItems,
            ],
          };

          filterDispatch(filterAction(newData));
        } else {
          setNoMore(true);
        }
      });
  };
  return (
    <div className={cssClass} onClick={clickHandle}>
      Xem thêm
    </div>
  );
}

export default ViewMoreButton = memo(ViewMoreButton);
