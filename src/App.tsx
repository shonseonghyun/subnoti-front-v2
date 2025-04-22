import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { QueryClientSettings } from './query/QueryClientSettings';
import router from './routes/Router';
import { ThemeSettings } from './theme/Theme';
import MutationLoading from './layouts/full/shared/MutationLoading';


function App() {
  const theme = ThemeSettings();
  const queryClient =QueryClientSettings();

  return (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <ToastContainer 
        position='top-center'
        autoClose={1500}
        hideProgressBar
        closeOnClick
      />
      <CssBaseline />
      <MutationLoading />
      <RouterProvider router={router}/>
    </ThemeProvider>
    {/* <ReactQueryDevtools initialIsOpen={true} /> */}
  </QueryClientProvider>
  );
}

export default App;
