export const createInitCheckedItems = (parentCategory, attributeItems) => {
  const initCheckedItems = [
    {
      id: -1,
      parentName: parentCategory[0].nameAscii,
      searchKey: '',
      name: '',
      parentOrder: -1,
    },
  ];

  attributeItems.forEach((e, i) => {
    initCheckedItems.push({
      id: -1,
      parentName: e.nameAscii,
      searchKey: '',
      name: '',
      parentOrder: i,
    });
  });
  return initCheckedItems;
};
