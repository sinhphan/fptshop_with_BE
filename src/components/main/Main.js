import {
  memo,
  createContext,
  useReducer,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import { ADMIN_SETTINGS } from '../../config/adminSettings';
import { createInitCheckedItems } from '../../config/createInitCheckedItems';
import { initDataAction } from '../../logic/filter_reducer/actions';
import filterReducer from '../../logic/filter_reducer/filterReducer';
import BreadCrum from './MainContentHeader/BreadCrum';
import MainContent from './MainContentHeader/MainContent';
import MainSidebar from './MainSideBar/MainSidebar';
import MainSlider from './MainContentHeader/MainSlider';
import { checkedItemsParse } from '../../logic/checkItemsParse';

export const FilterContext = createContext(null);
export const FilterDispatchContext = createContext(null);
export const CheckedItemsContext = createContext(null);
export const SetCheckedItemsContext = createContext(null);

function Main() {
  let isPC = document.body.offsetWidth > 1023;

  let initCheckedItems = [];
  const [filterProduct, dispatchFilter] = useReducer(filterReducer, {});
  let [checkedItems, setCheckedItems] = useState(initCheckedItems);
  let [dataLoading, setDataLoading] = useState(true);
  let [parentCategory, setParentCategory] = useState();
  let [attributeItems, setAttributeItems] = useState();

  const handleCheckItem = useCallback(
    (e) => {
      window.scrollTo({ top: 440, behavior: 'smooth' });
      const currentChecked = {
        id: +e.currentTarget.dataset.id,
        parentName: e.currentTarget.parentNode.dataset.query,
        searchKey: e.currentTarget.dataset.searchKey,
        name: e.currentTarget.dataset.name,
        parentOrder: +e.currentTarget.parentNode.dataset.order,
      };

      // if checking to all checkbox then remove all checked items of this category (parent)
      if (currentChecked.id === -1) {
        let isChildOfAnotherCategory = (e) =>
          e.parentName !== currentChecked.parentName;
        let newCheckedItems = checkedItems.filter(isChildOfAnotherCategory);
        checkedItems = [...newCheckedItems, currentChecked];

        return setCheckedItems(checkedItems);
      }

      let isItemChecked = (checkedItem) =>
        checkedItem.id == currentChecked.id &&
        checkedItem.parentName === currentChecked.parentName;
      let itemChecked = checkedItems.find(isItemChecked);
      // if filter checked => remove it else add it to the checked list
      if (itemChecked) {
        let isAnotherItems = (checkedItem) =>
          !(
            checkedItem.id === currentChecked.id &&
            checkedItem.parentName === currentChecked.parentName
          );
        let removeItemFromCheckItems = checkedItems.filter(isAnotherItems);

        setCheckedItems((checkedItems) => removeItemFromCheckItems);

        // if this category no checkbox cheked then add init value of this category to the checked list
        let hasCheckedItems =
          removeItemFromCheckItems.filter(
            (e) => e.parentName === currentChecked.parentName
          ).length > 0;
        if (!hasCheckedItems) {
          let initCheckedInThisCategory = {
            id: -1,
            parentName: currentChecked.parentName,
            searchKey: '',
            name: '',
            parentOrder: currentChecked.parentOrder,
          };

          removeItemFromCheckItems = [
            ...removeItemFromCheckItems,
            initCheckedInThisCategory,
          ];
          setCheckedItems(removeItemFromCheckItems);
        }
      } else {
        // remove init checked item of this category
        let isInitCheckedItem = (checkedItem) =>
          !(
            checkedItem.id === -1 &&
            checkedItem.parentName == currentChecked.parentName
          );
        let removedInitCheckedItem = checkedItems.filter(isInitCheckedItem);
        // add new checked list ofthis category
        setCheckedItems((checkedItems) => [
          ...removedInitCheckedItem,
          currentChecked,
        ]);
      }
    },
    [checkedItems]
  );

  useMemo(() => {
    if (!dataLoading) {
      //  for first group of main sidebar
      parentCategory = filterProduct?.navFilter?.listCategory.filter(
        (e) => e._id == ADMIN_SETTINGS.firstGroupOfSidebar
      );
      setParentCategory(parentCategory);
      // for second group of main sidebar
      attributeItems =
        filterProduct?.navFilterAttributeItem?.attributeItems.filter((e) => {
          return e.isShowNavFilter === true;
        });
      setAttributeItems(attributeItems);

      initCheckedItems = createInitCheckedItems(parentCategory, attributeItems);

      setCheckedItems(initCheckedItems);
    }
  }, [dataLoading]);

  useEffect(() => {
    const url = checkedItemsParse(checkedItems);
    console.log('Main ---> url:', url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        data.page = 1;
        data.url = url;
        dispatchFilter(initDataAction(data));
      });
  }, [checkedItems]);
  useEffect(() => {
    fetch('http://localhost:3001/product')
      .then((res) => res.json())
      .then((data) => {
        data.page = 1;
        dispatchFilter(initDataAction(data));
        setDataLoading(false);
      });
  }, []);

  if (!dataLoading)
    return (
      <FilterContext.Provider value={filterProduct}>
        <FilterDispatchContext.Provider value={dispatchFilter}>
          <CheckedItemsContext.Provider value={checkedItems}>
            <SetCheckedItemsContext.Provider value={setCheckedItems}>
              <div className="main flex js-center">
                <div className="width">
                  <BreadCrum />
                  <MainSlider />
                  <div className="main-content flex">
                    {isPC && (
                      <MainSidebar
                        parentCategory={parentCategory}
                        attributeItems={attributeItems}
                        onClick={handleCheckItem}
                      />
                    )}
                    <MainContent
                      parentCategory={parentCategory}
                      attributeItems={attributeItems}
                    />
                  </div>
                </div>
              </div>
            </SetCheckedItemsContext.Provider>
          </CheckedItemsContext.Provider>
        </FilterDispatchContext.Provider>
      </FilterContext.Provider>
    );

  return <></>;
}

export default Main = memo(Main);
