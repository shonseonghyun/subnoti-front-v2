import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import React from 'react';


interface INotiRegButtonProps {
  onClick?: () => void;
}

const NotiRegButton = ({onClick}:INotiRegButtonProps) => {
  console.log("NotiRegButton 랜더링");

    return (
        <IconButton
            onClick={onClick}
            color="primary"
            sx={{
              mr: 1,
              position: 'fixed',
              zIndex: "1",  
              bottom:'10%',
              right:'8%',
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
                transform: "scale(1.1)"
              },
            }}
          >
          <AddIcon />
        </IconButton>
    );
};

export default NotiRegButton;

export const MemorizedNotiRegButton = React.memo(NotiRegButton);