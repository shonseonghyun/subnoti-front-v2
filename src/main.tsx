  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LogoSplashScreen from './components/shared/LogoSplashScreen';
import { DashboardContextProvider } from './context/DashboardContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <DashboardContextProvider>
    <Suspense fallback={<LogoSplashScreen />}>
      <App />
    </Suspense>
  </DashboardContextProvider>
);