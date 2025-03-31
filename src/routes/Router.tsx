

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';

/* ***Layouts**** */
const FullLayout = lazy(() => import('../layouts/full/FullLayout'));
const BlankLayout = lazy(() => import('../layouts/blank/BlankLayout'));

const PrivateRoute = lazy(() => import('../private/PrivateRoute'));

/* ****Pages***** */
const Dashboard = lazy(() => import("../views/dashboard/page"));
const NotiPage = lazy(() => import('../views/noti/NotiPage'));
const Error = lazy(() => import('../views/authentication/NotFound'));
const Register = lazy(() => import('../views/authentication/Register'));
const Login = lazy(() => import('../views/authentication/Login'));
const Profile = lazy(() => import('../views/form-layouts/FormLayouts'));


const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', exact: true, element: <Dashboard /> },
      { path: '/guide', exact: true, element: <NotiPage /> },
      { path:"", element:<PrivateRoute />, children:[
        { path: 'noti/list', element: <NotiPage /> },
        { path: '/form-layouts', element: <Profile /> },
      ]},
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },

    ],
  },
  { basename: '/' }
];

const router = createBrowserRouter(Router);
export default router;
