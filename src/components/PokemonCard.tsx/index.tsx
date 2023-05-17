import React from 'react';
import {
  Accordion,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  AccordionDetails,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { Ability, Sprites } from '../../interfaces/pokemons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface PropTypes {
  name: string;
  sprites: Sprites; // Propiedad de sprites de la interfaz
  abilities: Ability[];
  weight: number;
  onDelete: () => void; // Función para eliminar el Pokémon
}

export const PokemonCard = ({
  name,
  sprites,
  abilities,
  weight,
  onDelete,
}: PropTypes) => {
  const handleDeleteClick = () => {
    onDelete(); // Llamar a la función para eliminar el Pokémon
  };

  const spriteImages = [
    sprites.front_default,
    sprites.back_default,
    sprites.front_shiny,
    sprites.back_shiny,
    // Agrega otras imágenes de sprites según sea necesario
  ].filter((image) => image !== null && image !== undefined);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Carousel>
        {spriteImages.map((image, index) => (
          <div key={index}>
            <Box
              sx={{
                position: 'relative',
                paddingTop: '56.25%',
                height: '115px',
                backgroundColor: '#f3f3f3',
              }}
            >
              <img
                src={image}
                alt="Pokemon"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </div>
        ))}
      </Carousel>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{
            textTransform: 'capitalize',
            fontFamily: 'Arial, sans-serif',
            color: '#333333',
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="h4"
          color="text.secondary"
          style={{
            fontFamily: 'Arial, sans-serif',
            color: '#666666',
            fontSize: '18px',
            fontWeight: 'bold',
            marginTop: '10px',
          }}
        >
          {weight}
        </Typography>
        <Accordion
          style={{
            marginTop: '20px',
            backgroundColor: '#f3f3f3',
            border: 'none',
            boxShadow: 'none',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              backgroundColor: '#f3f3f3',
              borderBottom: '1px solid #d0d0d0',
              marginBottom: '-1px',
            }}
          >
            <Typography
              style={{
                fontFamily: 'Arial, sans-serif',
                color: '#333333',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              Abilities
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              flexDirection: 'column',
              padding: '10px 0',
            }}
          >
            {abilities.map((ability) => (
              <Typography
                key={ability.ability.name}
                style={{
                  textTransform: 'capitalize',
                  borderBottom: '1px solid grey',
                  fontFamily: 'Arial, sans-serif',
                  color: '#666666',
                  fontSize: '14px',
                  padding: '5px 0',
                }}
              >
                {ability.ability.name}
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          borderTop: '1px solid #d0d0d0',
          marginTop: '20px',
        }}
      >
        <Button
          size="small"
          onClick={handleDeleteClick}
          startIcon={<DeleteIcon />}
          sx={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '14px',
            fontWeight: 'bold',
            textTransform: 'capitalize',
            backgroundColor: 'transparent',
            color: '#f44336',
            border: '1px solid #f44336',
            '&:hover': {
              backgroundColor: '#f44336',
              color: '#ffffff',
            },
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
