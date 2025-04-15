import { Box, Button, Container, Typography } from '@mui/material';
import { FallbackProps } from 'react-error-boundary';
import ErrorImg from 'src/assets/images/backgrounds/errorimg.svg';
import { getErrorDataByCode } from 'src/utils/error/error';

const ErrorFallback = ({ error, resetErrorBoundary }:FallbackProps) => {
  const errorData = getErrorDataByCode(error);


  return (
    <Box
      display="flex"
      flexDirection="column"
      // height="100vh"
      textAlign="center"
      justifyContent="center"
    >
      <Container maxWidth="md">
        <img src={ErrorImg} style={{ width: '100%', maxWidth: '500px' }} />
        <Typography align="center" variant="h2" mb={4}>
          {/* Opps!!! */}
          {errorData.title}
        </Typography>
        <Typography align="center" variant="h4" mb={4}>
          {/* This page you are looking for could not be found. */}
          {errorData?.content}
        </Typography>
        <Button color="primary" variant="contained" onClick={resetErrorBoundary} disableElevation>
          새로고침
        </Button>
      </Container>
    </Box>
  )
};

export default ErrorFallback;
