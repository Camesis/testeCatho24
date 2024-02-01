import React from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';

interface AddSkillButtonProps {
  onClick: () => void;
}

const styles = {
    largeIcon: {
      width: 40,
      height: 40,
    },      
};

const AddSkillButton: React.FC<AddSkillButtonProps> = ({ onClick }) => {
  return (
    <IconButton 
        aria-label="Add Skill"                                 
        onClick={onClick}                                
    >
        <AddCircleIcon style={styles.largeIcon}/>
    </IconButton>                           
   
  );
};

export default AddSkillButton;