import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

// SYNCHRONOUS ACTIONS that get called asynchronously

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

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
        dispatch(purchaseBurgerSuccess(response.data.name, response.data));
      })

      .catch(err => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};

// export const fetchOrders = () => {

// }

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
    loading: false
  };
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
    loading: true
  };
};

export const fetchOrders = () => dispatch => {
  dispatch(fetchOrdersStart()); //set loading to true to display a spinner while loading
  axios
    .get("/orders.json")
    .then(res => {
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key
        });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
      // this.setState({loading: false, orders: fetchedOrders});
    })
    .catch(err => {
      dispatch(fetchOrdersFail(err));
    });
};
