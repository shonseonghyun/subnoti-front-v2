  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DashboardContextProvider } from './context/DashboardContext';
import { BrowserRouter } from 'react-router-dom';

  ReactDOM.createRoot(document.getElementById('root')!).render(
      <DashboardContextProvider>
        <BrowserRouter>
          <Suspense fallback={<p>로딩중!!!</p>}>
            <App />
          </Suspense>
        </BrowserRouter>
      </DashboardContextProvider>
  );
