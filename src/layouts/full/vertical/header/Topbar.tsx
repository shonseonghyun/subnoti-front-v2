
import { AppBar, Box, Button, Stack, Toolbar, styled } from '@mui/material';

import wrappixelLogo from 'src/assets/images/logos/logo-wrappixel.svg';
import { useFetchGetEnum } from 'src/theme/useFetchGetEnum';



const Topbar = () => {


  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.grey[600],
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '61px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));


  const get= useFetchGetEnum("s");

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled sx={{flexWrap:"wrap"}} >
              <Stack
                  spacing={{ xs: 1, sm: 8 }}
                  direction="row"
                  useFlexGap
                  sx={{ flexWrap: 'wrap', justifyContent:{xs:"center", lg:"between"}, paddingY:{xs:"8px" , lg:"0px"} , width:{xs:"100%" , lg:"auto"} }}
              >
                 {/* <img src={wrappixelLogo} alt="logo" /> */}
              </Stack>
        <Box flexGrow={1} />
      </ToolbarStyled>
    </AppBarStyled>
  );
};


export default Topbar;
