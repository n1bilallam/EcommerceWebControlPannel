import axios from "../helpers/axios";

export const addProduct = (form)=>{
    return async dispatch=>{
    //   dispatch({type: productConstants.ADD_NEW_PRODUCT_REQUEST});
      const res = await axios.post(`/product/create`,form);
    //   if(res.status === 201){
    //     dispatch({
    //       type: productConstants.ADD_NEW_PRODUCT_SUCCESS,
    //       payload:{product:res.data.products}
    //     });
    //   }else{
    //     dispatch({
    //       type: productConstants.ADD_NEW_PRODUCT_FAILURE,
    //       payload: res.data.error
    //     });
    //   }
    console.log(res);
    }
  }

