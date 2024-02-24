import {
 CREATE_PAYMENT_FAILURE,
 CREATE_PAYMENT_SUCCESS,
 CREATE_PAYMENT_REQUEST,
 UPDATE_PAYMENT_REQUEST,
 UPDATE_PAYMENT_SUCCESS,
 UPDATE_PAYMENT_FAILURE,
  } from "./ActionType";
  
  const initialState = {
    productss: [],
    product: null,
    loading: false,
    error: null,
  };
  export const customerProductReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_PAYMENT_REQUEST:
      case  UPDATE_PAYMENT_REQUEST:
        return { ...state, loading: true, error: null };
  
      // case CREATE_PAYMENT_SUCCESS:
      UPDATE_PAYMENT_SUCCESS
        return {
          ...state,
          loading: false,
          error: null,
          products: action.payload,
        };
      case UPDATE_PAYMENT_FAILURE:
      case CREATE_PAYMENT_FAILURE:
        return {
          ...state,
          loading:false,
          products: action.payload,
        };

      default:
        return state;
    }
  };
  