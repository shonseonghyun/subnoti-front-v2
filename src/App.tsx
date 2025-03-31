import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';
import router from './routes/Router';
import { ThemeSettings } from './theme/Theme';
import { toastFail, toastSuc } from './utils/toast/toast';


function App() {
  const theme = ThemeSettings();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 600000,
        // staleTime: 2000,
        cacheTime: 900000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry:0,
        // useErrorBoundary:true
      },
      
      mutations:{
        useErrorBoundary:false,
        onSuccess: ()=>{
          console.log("index.tsx mutations onSuccess");
          toastSuc();
        },
        onError:(error:any) =>{
          console.log("index.tsx mutations onError");
          toastFail(error);
        }
      }
    },
  });

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
      <RouterProvider router={router}/>
    </ThemeProvider>
    {/* <ReactQueryDevtools initialIsOpen={true} /> */}
  </QueryClientProvider>
  );
}

export default App;
