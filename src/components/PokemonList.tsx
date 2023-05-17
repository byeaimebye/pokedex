import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers/root.reducer';
import { getPokemons } from '../store/actions/pokemon.actions';
import { Pokemons } from '../interfaces/pokemons';
import { PokemonCard } from './PokemonCard.tsx';
import {  IconButton, CircularProgress, Box, Input, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/ExpandMore';

export const PokemonsList = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state: RootState) => state.pokemon.pokemons);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemons[]>([]);
  const [visiblePokemons, setVisiblePokemons] = useState<number>(10); // Número inicial de pokémon visibles
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemons | null>(null);
  const [loading, setLoading] = useState(false); // Estado para controlar el loading
  const [showScrollToTop, setShowScrollToTop] = useState(false); // Estado para mostrar/ocultar el botón de scroll to top

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  useEffect(() => {
    filterPokemons();
  }, [searchTerm, allPokemons]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDelete = (pokemon: Pokemons) => {
    setSelectedPokemon(pokemon);
    setOpenModal(true);
  };

  const handleConfirmDelete = () => {
    const updatedPokemons = filteredPokemons.filter((pokemon) => pokemon !== selectedPokemon);
    setFilteredPokemons(updatedPokemons);

    setOpenModal(false);
  };

  const filterPokemons = () => {
    const filtered = allPokemons.filter((pokemon: Pokemons) => {
      const nameMatches = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const abilityMatches = pokemon.abilities.some((ability) =>
        ability.ability.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return nameMatches || abilityMatches;
    });

    setFilteredPokemons(filtered);
  };

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleLoadMore = () => {
    setVisiblePokemons((prevVisiblePokemons) => prevVisiblePokemons + 10);
  };

  const handleScroll = () => {
    setShowScrollToTop(window.pageYOffset > 300);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWindowLoad = () => {
    setShowScrollToTop(false);
  };

  useEffect(() => {
    window.addEventListener('load', handleWindowLoad);

    return () => {
      window.removeEventListener('load', handleWindowLoad);
    };
  }, []);

  return (
    <>
      <Box sx={{ 
        padding: '20px', 
        position: 'fixed', 
        background: 'black',
        zIndex: '99', 
        width: '100%' 
        }}>
        <Input
          sx={{ 
            border: '1px solid white', 
            borderRadius: '12px', 
            padding: '10px',
            backgroundColor: 'white' 
          }}
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Search by name or ability"
        />
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          justifyContent: 'center',
          '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr',
            alignItems: 'center',
          },
        }}
      >
        {filteredPokemons.slice(0, visiblePokemons).map((pokemon: Pokemons, index) => (
          <PokemonCard
            key={index}
            name={pokemon.name}
            image={pokemon?.sprites?.other?.dream_world?.front_default}
            abilities={pokemon.abilities}
            weight={pokemon.weight}
            onDelete={() => handleDelete(pokemon)}
          />
        ))}
      </Box>
      {visiblePokemons < filteredPokemons.length && !loading && (
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <Button onClick={handleLoadMore}>Load More</Button>
        </Box>
      )}
      {loading && (
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </Box>
      )}
      {showScrollToTop && (
        <Box sx={{ 
          position: 'fixed', 
          right: '20px', 
          bottom: '20px', 
          background: 'white',
          borderRadius: '55px'
          }}>
          <IconButton onClick={handleScrollToTop}>
            <KeyboardArrowUpIcon />
          </IconButton>
        </Box>
      )}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {selectedPokemon?.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

