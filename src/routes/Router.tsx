

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';

// lazy() 사용이유는 필요할 떄만 해당 컴포넌트를 로딩해서 앱 성능을 높이기 위함에 있다.(코드 스플리팅)
// 즉, 반대로 생각하면 리액트는 lazy()를 사용하지 않는 경우 정적 import를 통해 모든 컴포넌트를 번들에 한꺼번에 포함시킨다.
// 예를 들어, 
// import Dashboard from './Dashboard';
// import Profile from './Profile';
// import NotiList from './NotiList';
// 정적 import를 할 경우 Profile 페이지를 방문하지 않았음에도 이미 로딩되어 있다.

/* ***Layouts**** */
const FullLayout = lazy(() => import('../layouts/full/FullLayout'));
const BlankLayout = lazy(() => import('../layouts/blank/BlankLayout'));

const PrivateRoute = lazy(() => import('../private/PrivateRoute'));
const NotLoginedRoute = lazy(() => import('../private/NotLoginedRoute'));

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
      { path:"", element:<NotLoginedRoute />, children:[
        { path: '/auth/register', element: <Register /> },
        { path: '/auth/login', element: <Login /> },
      ]},
    ],
  },
  { basename: '/' }
];

const router = createBrowserRouter(Router);
export default router;
