import * as ACTIONS from './actionsConstant';

function filterReducer(state, action) {
  let payload = action.payload;
  let initState;
  let filteredProducts;
  let newState = {};
  switch (action.type) {
    case ACTIONS.INIT_DATA_ACTION:
      initState = payload;
      return payload;

    case ACTIONS.FILTER_ACTION:
      return payload;

    case ACTIONS.BEST_SELLING_FILTER_ACTION:
      return payload;

    case ACTIONS.LOW_PRICE_FILTER_ACTION:
      return payload;

    case ACTIONS.HIGH_PRICE_FILTER_ACTION:
      return payload;

    case ACTIONS.ZERO_PERCENT_PAYMENT_FILTER_ACTION:
      return payload;

    case ACTIONS.ONLINE_OFFER_FILTER_ACTION:
      return payload;

    default:
      break;
  }
}

export default filterReducer;
