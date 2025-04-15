import { Box, CircularProgress } from '@mui/material';
import ReactDOM from "react-dom";

const FullscreenLoader = () => {
  return ReactDOM.createPortal(
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.05)', // 반투명한 검정 배경
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1300, // MUI Modal보다 위에 있게 하려면 이 정도 줘야 함
      }}
    >
      <CircularProgress color="inherit" />
    </Box>,document.body
  );
};

export default FullscreenLoader;