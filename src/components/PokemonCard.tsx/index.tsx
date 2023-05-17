import React from 'react';
import {
  Accordion,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  AccordionDetails,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Ability } from '../../interfaces/pokemons';

interface PropTypes {
  name: string;
  image?: string;
  electrode?: string;
  abilities: Ability[];
  weight: number;
  onDelete: () => void; // Función para eliminar el Pokémon
}

export const PokemonCard = ({
  name,
  image,
  abilities,
  weight,
  onDelete,
}: PropTypes) => {
  const handleDeleteClick = () => {
    onDelete(); // Llamar a la función para eliminar el Pokémon
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Box sx={{ position: 'relative', paddingTop: '56.25%', height: '115px' }}>
        <CardMedia
          component="img"
          alt="green iguana"
          image={image}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{ textTransform: 'capitalize' }}>
          {name}
        </Typography>
        <Typography variant="h4" color="text.secondary">
          {weight}
        </Typography>
        <Accordion style={{ marginTop: '5px' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Abilities</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {abilities.map((n) => (
              <Typography style={{ textTransform: 'capitalize', borderBottom: '1px solid grey' }} key={n.ability.name}>
                {n.ability.name}
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleDeleteClick}>Delete</Button> {/* Botón de eliminación */}
      </CardActions>
    </Card>
  );
};
