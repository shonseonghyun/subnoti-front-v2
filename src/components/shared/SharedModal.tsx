import AddIcon from '@mui/icons-material/Add';
import { IconButton, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import { ReactNode, useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '12px', // 더 부드럽게 둥근 모서리
  boxShadow: 24,
  p: 4,
  textAlign: 'left', // 텍스트 정렬을 왼쪽으로 조정
  fontFamily: '"Pretendard", sans-serif'
};

interface ModalProps {
  child: ReactNode;
  title?: string;
}

export default function SharedModal({ child, title }: ModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <IconButton
        color="primary"
        sx={{
          mr: 1,
          position: 'absolute',
          right: '10%',
          top: '4%',
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
        onClick={handleOpen}
      >
        <AddIcon />
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {title && <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main', textAlign: 'left', fontFamily: 'Pretendard, sans-serif' }}>{title}</Typography>}
            {child}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
