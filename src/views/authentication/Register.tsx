
import { Box, Card, Grid, Stack, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router';
import AuthRegister from './auth/AuthRegister';
import Logo from 'src/layouts/full/shared/logo/Logo';

const Register2 = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        '&:before': {
          content: '""',
          background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
          position: 'absolute',
          height: '100%',
          width: '100%',
          opacity: '0.3',
        },
      }}
    >
      <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={12}
          sm={12}
          lg={4}
          xl={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
            <Box display="flex" alignItems="center" justifyContent="center" sx={{ background: theme.palette.primary.main}}
            >
              <Logo />
            </Box>
            <AuthRegister
              // subtext={
              //   <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
              //     Your Social Campaigns
              //   </Typography>
              // }
              subtitle={
                <Stack direction="row" justifyContent="center" spacing={1} mt={3}>
                  <Typography color="textSecondary" fontWeight="400">
                    이미 계정이 있으신가요?
                  </Typography>
                  <Typography
                    component={Link}
                    to="/auth/login"
                    fontWeight="500"
                    sx={{
                      textDecoration: 'none',
                      color: 'primary.main',
                    }}
                  >
                    로그인
                  </Typography>
                </Stack>
              }
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register2;
