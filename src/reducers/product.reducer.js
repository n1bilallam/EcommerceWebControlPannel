import { productConstants } from "../actions/constants";
const initState = {
  products: [],
  loading: false,
  error: null,
};
export default (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCT_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
      };
      break;
    case productConstants.DELETE_PRODUCT_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.DELETE_PRODUCT_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case productConstants.DELETE_PRODUCT_BY_ID_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    default:
      break;
  }
  return state;
};
