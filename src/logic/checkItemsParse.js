export const checkedItemsParse = (checkedItems) => {
  const queries = {};
  let query;

  checkedItems = checkedItems.filter((e) => e.id !== -1);
  checkedItems.forEach((e) => {
    if (e.parentName === 'brand')
      queries.brand = queries.brand
        ? `${queries.brand}|${e.searchKey}`
        : e.searchKey;

    if (e.parentName === 'muc-gia')
      queries.price = queries.price
        ? `${queries.price}|${filterByPrice(e.searchKey)}`
        : filterByPrice(e.searchKey);

    if (e.parentName === 'man-hinh')
      queries.screen = queries.screen
        ? `${queries.screen}|${filterByScreenSize(e.searchKey)}`
        : filterByScreenSize(e.searchKey);

    if (e.parentName === 'cpu')
      queries.cpu = queries.cpu
        ? `${queries.cpu}|${filterByCPU(e.searchKey)}`
        : filterByCPU(e.searchKey);

    if (e.parentName === 'card-do-hoa')
      queries.gpu = queries.gpu
        ? `${queries.gpu}|${filterByGraphicCard(e.searchKey)}`
        : filterByGraphicCard(e.searchKey);

    if (e.parentName === 'ram')
      queries.ram = queries.ram ? `${queries.ram}|${e.name}` : e.name;

    if (e.parentName === 'o-cung')
      queries.ssd = queries.ssd ? `${queries.ssd}|${e.name}` : e.name;
  });

  for (let key of Object.keys(queries)) {
    query = query
      ? query + '&' + key + '=' + queries[key]
      : key + '=' + queries[key];
  }
  query = query ? query : '';
  let url = `http://localhost:3001/product?${query}`;
  console.log('checkedItemsParse ---> url:', url);
  return url;
};

function filterByPrice(key) {
  switch (key) {
    case 'duoi-10-trieu':
      return '0-10e6';
    case 'tu-10-15-trieu':
      return '10e6-15e6';
    case 'tu-15-20-trieu':
      return '15e6-20e6';
    case 'tu-20-25-trieu':
      return '20e6-25e6';
    case 'tren-25-trieu':
      return '25e6-10e8';
    default:
      return '0-10e8';
  }
}

function filterByScreenSize(key) {
  switch (key) {
    case 'khoang-13-inch':
      return '13(.*)inch';
    case 'khoang-14-inch':
      return '14(.*)inch';
    case 'tren-15-inch':
      return '15(.*)inch|16(.*)inch';
    default:
      return '';
  }
}

function filterByCPU(key) {
  switch (key) {
    case 'intel-celeron':
      return 'Celeron';

    case 'intel-pentium':
      return 'Pentium';

    case 'intel-core-i3':
      return 'i3';

    case 'intel-core-i5':
      return 'i5';

    case 'intel-core-i7':
      return 'i7';

    case 'amd-ryzen-3':
      return 'Ryzen';

    case 'amd-ryzen-5':
      return 'Ryzen';

    case 'amd-ryzen-7':
      return 'Ryzen';

    case 'amd-ryzen-9':
      return 'Ryzen';

    default:
      return '';
  }
}

function filterByGraphicCard(key) {
  switch (key) {
    case 'nvidia-geforce-series':
      return 'NVIDIA';

    case 'amd-radeon-series':
      return 'AMD(.*)Graphics';
    case 'card-onboard':
      return 'Intel(.*)Graphics';

    default:
      break;
  }
}
