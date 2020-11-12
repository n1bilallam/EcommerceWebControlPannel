import { pageConstants } from "./constants";
import axios from "../helpers/axios";
export const createPage = (form) => {
  return async (dispatch) => {
    dispatch({ type: pageConstants.ADD_NEW_PAGE_REQUEST });
    try {
      const res = await axios.post("/pages/create", form);
      if (res.status === 201) {
        dispatch({
          type: pageConstants.ADD_NEW_PAGE_SUCCESS,
          payload: { page: res.data.page },
        });
      } else {
        dispatch({
          type: pageConstants.ADD_NEW_PAGE_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
