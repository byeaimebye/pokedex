import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers/root.reducer';
import { getPokemons } from '../store/actions/pokemon.actions';
import { Pokemons } from '../interfaces/pokemons';
import { PokemonCard } from './PokemonCard.tsx';
import { Box } from '@mui/material';

export const PokemonsList = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state: RootState) => state.pokemon.pokemons);

  useEffect(() => {
    dispatch(getPokemons()); 
  }, [dispatch]);

  console.log('poke',pokemons); 

  return (
    <Box
  sx={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    justifyContent: 'center', 
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      alignItems: 'center', // Alinea los elementos al centro verticalmente
    }
  }}
>
  {pokemons.map((pokemon: Pokemons, index) => (
    <PokemonCard key={index} name={pokemon.name} />
  ))}
</Box>
    
  );
};
