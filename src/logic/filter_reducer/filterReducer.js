import * as ACTIONS from './actionsConstant';

function filterReducer(state, action) {
  let payload = action.payload;
  let initState;
  let filteredProducts;
  let newState = {};
  const queries = {};
  let query;
  switch (action.type) {
    case ACTIONS.INIT_DATA_ACTION:
      initState = payload;
      return payload;

    case ACTIONS.FILTER_ACTION:
      console.log('filterReducer->payload', payload);
      payload = payload.filter((e) => e.id !== -1);
      payload.forEach((e) => {
        if (e.parentName === 'brand')
          queries.brand = queries.brand
            ? `${queries.brand}|${e.searchKey}`
            : e.searchKey;

        if (e.parentName === 'muc-gia')
          queries.price = queries.price
            ? `${queries.price}'|'${filterByPrice(e.searchKey)}`
            : filterByPrice(e.searchKey);
      });
      for (let key of Object.keys(queries)) {
        query = query ? query + '&' + queries[key] : queries[key];
      }
      fetch(`http://localhost:3001/product?${query}`).then(async (res) => {
        console.log(await res.json);
      });
      return state;
    case ACTIONS.BEST_SELLING_FILTER_ACTION:
      state.listDefault.list.sort(
        (a, b) =>
          b.productVariant.stockQuantity - a.productVariant.stockQuantity
      );
      newState = { ...state };
      return newState;

    case ACTIONS.LOW_PRICE_FILTER_ACTION:
      state.listDefault.list.sort(
        (a, b) => a.productVariant.price - b.productVariant.price
      );
      newState = { ...state };
      return newState;

    case ACTIONS.HIGH_PRICE_FILTER_ACTION:
      state.listDefault.list.sort(
        (a, b) => b.productVariant.price - a.productVariant.price
      );
      newState = { ...state };
      return newState;

    case ACTIONS.ZERO_PERCENT_PAYMENT_FILTER_ACTION:
      filteredProducts = state.listDefault.list.filter(
        (product) => product.labelInst === 'Trả góp 0%'
      );

      newState = {
        ...state,
        listDefault: {
          ...state.listDefault,
          list: filteredProducts,
        },
      };
      return newState;

    case ACTIONS.ONLINE_OFFER_FILTER_ACTION:
      return state;

    default:
      break;
  }
}

export default filterReducer;

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
      break;
  }
}

function filterByScreenSize(key, screenSize) {
  let size = +screenSize.slice(0, 2);
  switch (key) {
    case 'khoang-13-inch':
      return size == 13;
    case 'khoang-14-inch':
      return size == 14;
    case 'tren-15-inch':
      return size >= 15;
    default:
      break;
  }
}

function filterByCPU(key, cpu) {
  switch (key) {
    case 'intel-celeron':
      return cpu === 'Celeron';

    case 'intel-pentium':
      return cpu === 'Pentium';

    case 'intel-core-i3':
      return cpu === 'Core i3';

    case 'intel-core-i7':
      return cpu === 'Core i7';

    case 'amd-ryzen-3':
      return cpu === 'Ryzen 3';

    case 'amd-ryzen-5':
      return cpu === 'Ryzen 5';

    case 'amd-ryzen-7':
      return cpu === 'Ryzen 7';

    case 'amd-ryzen-9':
      return cpu === 'Ryzen 9';

    default:
      break;
  }
}

function filterByRAM(key, ram) {
  ram = +ram.slice(0, 2);

  switch (key) {
    case '4-gb':
      return ram === 4;

    case '8-gb':
      return ram === 8;

    case '16-gb':
      return ram === 16;

    case '32-gb':
      return ram === 32;

    default:
      break;
  }
}

function filterByGraphicCard(key, graphicCard) {
  switch (key) {
    case 'nvidia-geforce-series':
      return graphicCard.includes('NVIDIA');

    case 'amd-radeon-series':
      return graphicCard.includes('AMD');

    case 'card-onboard':
      return graphicCard.includes('Intel');

    default:
      break;
  }
}

function filterBySSD(key, ssd) {
  switch (key) {
    case 'ssd-1-tb':
      return ssd.includes('1 TB');

    case 'ssd-512-gb':
      return ssd.includes('512');

    case 'ssd-256-gb':
      return ssd.includes('256');

    case 'ssd-128-gb':
      return ssd.includes('128');

    default:
      break;
  }
}
