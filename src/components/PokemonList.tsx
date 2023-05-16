import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers/root.reducer';
import { getPokemons } from '../store/actions/pokemon.actions';
import { Pokemons } from '../interfaces/pokemons';

export const PokemonsList = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state: RootState) => state.pokemon.pokemons);

  useEffect(() => {
    dispatch(getPokemons()); // Dispara la acción al montar el componente
  }, [dispatch]);

  console.log('poke',pokemons); // Verifica si los datos de los pokemons están disponibles

  return (
    <div>
       {pokemons.map((pokemon: Pokemons, index) => (
        <h1 key={index}>{pokemon.name}</h1>
      ))} 
    </div>
  );
};
