import { Box, Container, styled, useTheme } from '@mui/material';
import { FC } from 'react';
import { Outlet, useLocation } from 'react-router';
// import Header from './vertical/header/Header';
import Footer from './shared/footer/Footer';
import Header from './vertical/header/Header';
import Sidebar from './vertical/sidebar/Sidebar';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from 'src/components/shared/ErrorFallback';
import { useQueryErrorResetBoundary } from 'react-query';


const MainWrapper = styled('div')(() => ({}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));

const FullLayout: FC = () => {
  const theme = useTheme();
  const { reset } = useQueryErrorResetBoundary();
  const location = useLocation();

  return (
    <>

      {/* ------------------------------------------- */}
      {/* Topbar */}
      {/* ------------------------------------------- */}
      {/* <Topbar/> */}
      <MainWrapper>
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        {/* <Topbar /> */}
        {<Header />}
        {/* ------------------------------------------- */}
        {/* Sidebar */}
        {/* ------------------------------------------- */}
        <Sidebar />
        {/* ------------------------------------------- */}
        {/* Main Wrapper */}
        {/* ------------------------------------------- */}

        <PageWrapper
          className="page-wrapper"
          sx={{
            ...({
              [theme.breakpoints.up('lg')]: {
                ml: `256px`,
              },
            }),
            marginTop: "92px"
          }}
        >
          {/* PageContent */}
          <Container
            sx={{
              maxWidth: 'lg',
            }}
          >
            {/* ------------------------------------------- */}
            {/* PageContent */}
            {/* ------------------------------------------- */}

            <Box mt={4} sx={{ minHeight: 'calc(100vh - 260px)' }}>
              <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset} resetKeys={[location.pathname]}>
                <Outlet />
              </ErrorBoundary>
            </Box>
            <Footer />
            {/* ------------------------------------------- */}
            {/* End Page */}
            {/* ------------------------------------------- */}
          </Container>
           
        </PageWrapper>
      </MainWrapper>
    </>
  );
};
export default FullLayout;
