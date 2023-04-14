import * as ACTIONS from './actionsConstant';

function filterReducer(state, action) {
  let payload = action.payload;
  switch (action.type) {
    case ACTIONS.INIT_DATA_ACTION:
      return payload;
    default:
      break;
  }
}

export default filterReducer;
