import { combineReducers } from 'redux';
import pokemonReducer,{ PokemonsState }from './pokemon.reducer';

export interface RootState {
  pokemon: PokemonsState;
  // Otros reducers y sus estados aquí...
}

const rootReducer = combineReducers<RootState>({
  pokemon: pokemonReducer,
  // Otros reducers aquí...
});

export default rootReducer;
