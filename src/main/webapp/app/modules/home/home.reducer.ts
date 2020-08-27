/* eslint-disable no-console */
import axios from 'axios';
import { IPair } from 'app/shared/model/pair.model';
import { REQUEST, FAILURE, SUCCESS } from 'app/shared/reducers/action-type.util';
import { ICrudGetAction, ICrudGetAllAction } from 'react-jhipster';

export const ACTION_TYPES = {
  FETCH_LIST_DELIVERED: '/FETCH_LIST_DELIVERED',
  FETCH_LIST_SALESDAY: '/FETCH_LIST_SALESDAY',
  FETCH_LIST_PRODUCTSALES: '/FETCH_LIST_PRODUCTSALES',
  FETCH_LIST_PRODUCTINCOME: '/FETCH_LIST_PRODUCTINCOME',
};

const initialState = {
  loading: false,
  errorMessage: null,
  deliveredDay: [] as ReadonlyArray<IPair>,
  salesDay: [] as ReadonlyArray<IPair>,
  productSales: [] as ReadonlyArray<IPair>,
  productIncome: [] as ReadonlyArray<IPair>,
  updating: false,
  updateSuccess: false,
};

export type HomeState = Readonly<typeof initialState>;

export default (state: HomeState = initialState, action): HomeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LIST_DELIVERED):
    case REQUEST(ACTION_TYPES.FETCH_LIST_SALESDAY):
    case REQUEST(ACTION_TYPES.FETCH_LIST_PRODUCTSALES):
    case REQUEST(ACTION_TYPES.FETCH_LIST_PRODUCTINCOME):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_LIST_DELIVERED):
    case FAILURE(ACTION_TYPES.FETCH_LIST_SALESDAY):
    case FAILURE(ACTION_TYPES.FETCH_LIST_PRODUCTSALES):
    case FAILURE(ACTION_TYPES.FETCH_LIST_PRODUCTINCOME):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_LIST_DELIVERED):
      return {
        ...state,
        loading: false,
        deliveredDay: action.payload.date,
      };
    case SUCCESS(ACTION_TYPES.FETCH_LIST_SALESDAY):
      return {
        ...state,
        loading: false,
        salesDay: action.payload.date,
      };
    case SUCCESS(ACTION_TYPES.FETCH_LIST_PRODUCTSALES):
      return {
        ...state,
        loading: false,
        productSales: action.payload.date,
      };
    case SUCCESS(ACTION_TYPES.FETCH_LIST_PRODUCTINCOME):
      return {
        ...state,
        loading: false,
        productIncome: action.payload.date,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/';

// Actions

export const getDeliveredDay: ICrudGetAllAction<IPair> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_LIST_DELIVERED,
  payload: axios.get<IPair>('${apiUrl}'),
});

export const getSalesDay: ICrudGetAllAction<IPair> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_LIST_SALESDAY,
  payload: axios.get<IPair>('${apiUrl}'),
});

export const getProductSales: ICrudGetAllAction<IPair> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_LIST_PRODUCTSALES,
  payload: axios.get<IPair>('${apiUrl}'),
});

export const getProductIncome: ICrudGetAllAction<IPair> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_LIST_PRODUCTINCOME,
  payload: axios.get<IPair>('${apiUrl}'),
});
