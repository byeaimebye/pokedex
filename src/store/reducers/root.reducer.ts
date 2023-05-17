import { combineReducers } from 'redux';
import pokemonsReducer,{ PokemonsState }from './pokemon.reducer';

export interface RootState {
  pokemon: PokemonsState;
}

const rootReducer = combineReducers<RootState>({
  pokemon: pokemonsReducer,
});

export default rootReducer;
