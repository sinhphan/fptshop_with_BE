import * as ACTIONS from './actionsConstant';

export const initDataAction = (payload) => {
  return {
    type: ACTIONS.INIT_DATA_ACTION,
    payload,
  };
};
