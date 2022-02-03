import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router';
import PoemForm from './PoemForm';
import getPoem from '../services/getPoem';

const Body = () => {
  const [poemData, setPoemData] = useState<{ seed: string; sonnet: string }>({
    seed: '',
    sonnet: '',
  });
  const { seed } = useParams();

  const getPoemData = (seedId = '') => {
    getPoem(seedId).then(poem => {
      setPoemData(poem);
    });
  };

  useEffect(() => {
    getPoemData(seed);
  }, [seed]);

  return (
    <Box
      sx={{
        width: { mobile: '100vw', tablet: '80vw' },
        height: 'calc(100vh - 110px)',
        backgroundColor: '#fff',
        padding: {
          mobile: '1vw',
          tablet: '4vw',
          desktop: '1vw 5vw',
        },
        boxSizing: 'border-box',
      }}
    >
      <PoemForm />
      <Typography sx={{ width: '100%', textAlign: 'center' }}>
        {`Current Seed: ${poemData.seed}`}
      </Typography>
      <Typography sx={{ whiteSpace: 'pre-line', marginTop: '10px' }}>
        {poemData.sonnet}
      </Typography>
    </Box>
  );
};

export default Body;
