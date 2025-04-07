import { Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import React, { ReactElement, useCallback, useState } from 'react';

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

interface IModalProps {
  children: React.ReactNode;
  title?: string;
  button: ReactElement;
}

export default function SharedModal({ children, title, button }: IModalProps) {
  console.log("SharedModal 랜더링");

  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true),[open]);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      {React.cloneElement(button, { onClick: handleOpen })}

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
            {children} {/* 여기! */}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

// export const MemorizedSharedModal= React.memo(SharedModal);