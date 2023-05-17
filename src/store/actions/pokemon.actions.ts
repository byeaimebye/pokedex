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

      const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
      console.log('data full', data)

      const pokemonPromises = data.results.map(async (pokemon: any) => {
        const { data: pokemonData } = await axios.get(pokemon.url);
        return pokemonData;
      });

      const pokemonData = await Promise.all(pokemonPromises);

      dispatch({
        type: types.FETCH_POKEMONS_SUCCESS,
        payload: pokemonData,
      });
    } catch (error: any) {
      dispatch({
        type: types.FETCH_POKEMONS_FAILURE,
        payload: error.message,
      });
    }
  };
};
