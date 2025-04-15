import { Box } from '@mui/material';
import ReactDOM from "react-dom";
import appLogo from 'src/assets/images/backgrounds/app-logo.png';

const LogoSplashScreen = () => {
    return ReactDOM.createPortal(
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#1583ff', // 반투명한 검정 배경
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1300, // MUI Modal보다 위에 있게 하려면 이 정도 줘야 함
          }}
        >
        <img src={appLogo} alt="" width={200} height={200} />
      </Box>,document.body
      );
    };

export default LogoSplashScreen;


