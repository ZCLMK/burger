import * as actionTypes from "../actions/actionTypes";

// We need to handle the purchase being SENT (purchaseBurgerStart), before success or failure, to update the UI

const initialState = {
  orders: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      // On récupère l'id et les données de la commande reçue dans un même objet
      const newOrder = {
        ...action.data,
        id: action.id
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
      };

    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false // the error is handled via the withErrorHandler hoc
      };

    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      };

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false
      };

    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};

export default reducer;
