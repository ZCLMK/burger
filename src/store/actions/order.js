import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

// SYNCHRONOUS ACTIONS that get called asynchronously

export const purchaseBurgerSuccess = (orderId, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id: orderId,
    data: orderData
  };
};

export const purchaseBurgerFail = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error: error
});

// ASYNC ACTION CREATOR
const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
    loading: true
  };
};

export const purchaseBurger = orderData => {
  return dispatch => {
    // this sets loading to true
    dispatch(purchaseBurgerStart());
    // make the call
    axios
      .post("/orders.json", orderData)

      .then(response => {
        console.log(response);
        dispatch(purchaseBurgerSuccess(response.id, response.data));
      })

      .catch(err => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};
