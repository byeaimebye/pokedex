import { Dispatch, AnyAction } from 'redux';
import { types } from './actions.types';
import axios from 'axios';


export const getPokemons = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: types.FETCH_POKEMONS_REQUEST,
        payload: true,
      });

      const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon');
      dispatch({
        type: types.FETCH_POKEMONS_SUCCESS,
        payload: data.results,
      });
    } catch (error: any) {
      dispatch({
        type: types.FETCH_POKEMONS_FAILURE,
        payload: error.message,
      });
    }
  };
};
