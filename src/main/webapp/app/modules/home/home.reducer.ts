import axios from 'axios';
import { IPair } from 'app/shared/model/pair.model';
import { REQUEST, FAILURE, SUCCESS } from 'app/shared/reducers/action-type.util';
import { ICrudGetAllAction } from 'react-jhipster';

export const ACTION_TYPES = {
  FETCH_LIST_METRICS: '/FETCH_LIST_METRICS',
};

const initialState = {
  loading: false,
  errorMessage: null,
  metrics: [] as ReadonlyArray<IPair[]>,
  updating: false,
  updateSuccess: false,
};

export type HomeState = Readonly<typeof initialState>;

export default (state: HomeState = initialState, action): HomeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LIST_METRICS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_LIST_METRICS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_LIST_METRICS):
      return {
        ...state,
        loading: false,
        metrics: action.payload.data,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/';

// Actions

export const getMetrics: ICrudGetAllAction<IPair[]> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_LIST_METRICS,
  payload: axios.get<IPair[]>(`${apiUrl}`),
});
