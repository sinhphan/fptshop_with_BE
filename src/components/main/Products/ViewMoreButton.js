import { memo, useContext, useState } from "react";
import { FilterContext, FilterDispatchContext } from "../Main";
import { initDataAction } from "../../../logic/filter_reducer/actions";

function ViewMoreButton() {
  const data = useContext(FilterContext);
  const filterDispatch = useContext(FilterDispatchContext);
  const [noMore, setNoMore] = useState(false);
  let cssClass = noMore ? "view_more_btn hide" : "view_more_btn";

  const clickHandle = async () => {
    data.page += 1;
    const url = `${data.url}&page=${data.page}`;

    await fetch(url)
      .then((res) => res.json())
      .then((fetchData) => {
        const lengthData = fetchData.listDefault.list.length;
        if (lengthData >= 0) {
          const newData = {
            ...data,
            listDefault: {
              list: [...data.listDefault.list, ...fetchData.listDefault.list],
            },
          };

          filterDispatch(initDataAction(newData));
        }
        if (lengthData < 27) setNoMore(true);
      });
  };
  return (
    <div className={cssClass} onClick={clickHandle}>
      Xem thêm
    </div>
  );
}

export default ViewMoreButton = memo(ViewMoreButton);
