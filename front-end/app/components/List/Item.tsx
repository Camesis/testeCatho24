import React from 'react';

import { Box, ListItem, List, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

interface CandidateItemProps {
  name: string | undefined;
  skills: string[] | undefined;
}

const Item: React.FC<CandidateItemProps> = ({ name, skills }) => {
  return (
    <Box m={2} p={4} border="1px solid #ddd" borderRadius={4}>
      <h3>{name}</h3>
      <List style={{paddingLeft: '5px'}}>
        {skills?.map((skill, index) => (
             <ListItem
             key={index}                         
            >
              <CheckIcon style={{marginRight: '3px'}} /> <ListItemText primary={skill} />
            </ListItem>         
        ))}
        
    </List>      
    </Box>
  );
};

export default Item;
