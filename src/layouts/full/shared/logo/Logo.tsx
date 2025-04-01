
import { Link } from 'react-router';
import { styled } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as LogoDark } from 'src/assets/images/logos/dark-logo.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as LogoDarkRTL } from 'src/assets/images/logos/logo-icon.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as LogoLight } from 'src/assets/images/logos/light-logo.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as LogoLightRTL } from 'src/assets/images/logos/light-rtl-logo.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as MiniLogoLightRTL } from 'src/assets/images/logos/logo-light-icon.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as AppLogo } from 'src/assets/images/logos/app-logo.svg';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as TestAppLogo } from 'src/assets/images/logos/test-app-logo.svg';

import appLogo from 'src/assets/images/backgrounds/app-logo.png';

interface ILogoProps{
  onClick?: ()=>void;
}

const Logo = ({onClick}:ILogoProps) => {



  const LinkStyled = styled(Link)(() => ({
    height: '100px',
    width:  '100px',
    overflow: 'hidden',
    display: 'block',
  }));

  return (
    <LinkStyled
      onClick={onClick}
      to="/"
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* { <TestAppLogo />} */}
      <img src={appLogo} alt="" width={100} height={100} />
    </LinkStyled>
  );
};

export default Logo;
