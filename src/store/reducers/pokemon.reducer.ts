// pokemons.reducer.ts
import { types } from "../actions/actions.types";
import { Pokemons } from "../../interfaces/pokemons";

export interface PokemonsState {
  pokemons: Pokemons[];
  loading: boolean;
  error: string | null;
}

export const PokemonInitialState: PokemonsState = {
  pokemons: [],
  loading: false,
  error: null,
};

const pokemonsReducer = (state = PokemonInitialState, action: any) => {
  switch (action.type) {
    case types.FETCH_POKEMONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FETCH_POKEMONS_SUCCESS:
      return {
        ...state,
        pokemons: action.payload, // Actualiza la propiedad 'pokemons' con la data recibida
        loading: false,
        error: null,
      };
    case types.FETCH_POKEMONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default pokemonsReducer;
