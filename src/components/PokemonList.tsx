import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers/root.reducer';
import { getPokemons } from '../store/actions/pokemon.actions';
import { Pokemons } from '../interfaces/pokemons';
import { PokemonCard } from './PokemonCard.tsx';
import { IconButton, CircularProgress, Box, Input, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/ExpandMore';

export const PokemonsList = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state: RootState) => state.pokemon.pokemons);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemons[]>([]);
  const [visiblePokemons, setVisiblePokemons] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemons | null>(null);
  const [loading, setLoading] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

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
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          padding: '20px',
          background: 'linear-gradient(to right, #FFA500, #FF4500)', // Utilizando gradiente de naranja a rojo
          zIndex: 99,
          borderBottom: '1px solid white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Input
          sx={{
            border: '1px solid white',
            borderRadius: '12px',
            padding: '10px',
            backgroundColor: 'white',
            color: 'black',
            width: '300px',
          }}
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Search by name or ability"
        />
        <h1 style={{ color: 'white', marginBottom: 0, fontFamily: 'Arial', fontSize: '24px' }}>
          Poke App
        </h1>
      </Box>

      <Box
        sx={{
          maxWidth: '1280px',
          margin: '0 auto',
          paddingTop: '140px',
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
        {filteredPokemons?.slice(0, visiblePokemons).map((pokemon: Pokemons, index) => (
          <PokemonCard
            key={index}
            name={pokemon.name}
            sprites={pokemon?.sprites}
            abilities={pokemon.abilities}
            weight={pokemon.weight}
            onDelete={() => handleDelete(pokemon)}
          />
        ))}
      </Box>
      {visiblePokemons < filteredPokemons?.length && !loading && (
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(to right, #FFA500, #FF4500)', // Utilizando gradiente de naranja a rojo
              color: 'white',
              borderRadius: '12px',
              padding: '10px 20px',
            }}
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        </Box>
      )}
      {loading && (
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <CircularProgress color="secondary" />
        </Box>
      )}
      {showScrollToTop && (
        <Box
          sx={{
            position: 'fixed',
            right: '20px',
            bottom: '20px',
            background: 'linear-gradient(to right, #FFA500, #FF4500)', // Utilizando gradiente de naranja a rojo
            borderRadius: '55px',
          }}
        >
          <IconButton onClick={handleScrollToTop}>
            <KeyboardArrowUpIcon style={{ color: 'white' }} />
          </IconButton>
        </Box>
      )}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Delete Confirmation</DialogTitle>
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