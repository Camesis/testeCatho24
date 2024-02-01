import React from 'react';

import { Box, Container } from '@mui/material';

import Item from './Item';

interface ListCandidatesProps {
  candidates: { name: string; skills: string[] }[];
}

const ListCandidates: React.FC<ListCandidatesProps> = ({ candidates }) => {
    
  return (
    <Container maxWidth="sm">
        <Box m={2} p={4} border="1px solid #ddd" borderRadius={4}>
            <h1 className="text-2xl mb-4">Lista de Candidatos</h1>
            {candidates.map((candidate, index) => (
                <Item key={index} name={candidate.name} skills={candidate.skills} />
            ))}
        </Box>
    </Container>
    
  );
};

export default ListCandidates;
