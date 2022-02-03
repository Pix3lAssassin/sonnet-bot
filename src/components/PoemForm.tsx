import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import GenerateIcon from '@mui/icons-material/AutorenewRounded';
import { useNavigate } from 'react-router';

const PoemForm = () => {
  const [input, setInput] = useState<string>('');
  const navigate = useNavigate();

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (input) {
      navigate(`/${input}`);
    } else {
      navigate(`/${Math.random().toString(16).slice(2)}`);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      component="form"
      onSubmit={onSubmit}
    >
      <Typography variant="h5">Seed:</Typography>
      <TextField
        size="small"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <Button
        sx={{
          margin: '1vw',
        }}
        variant="contained"
        onClick={onSubmit}
        endIcon={<GenerateIcon />}
      >
        Generate Poem
      </Button>
    </Box>
  );
};

export default PoemForm;
