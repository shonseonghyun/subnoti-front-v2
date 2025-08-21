import { Box, Button } from '@mui/material';


interface IProfileUpdateButtonProps {
    formId: string;
  }
  
  const ProfileUpdateButton = ({ formId }: IProfileUpdateButtonProps) => {    
    return (
        <Box display="flex" justifyContent="end" >
        <Button form={formId} type="submit" color="primary" variant="contained">
          수정
        </Button>
      </Box>
    );
};

export default ProfileUpdateButton;