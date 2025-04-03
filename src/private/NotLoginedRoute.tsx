import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../zustand/AuthUserInfo';


export const NotLoginedRoute = () => {
    const {isLogin} = useAuthStore.getState();
    
    return !isLogin 
        ? <Outlet />
        : <Navigate to="/"  />
};

export default NotLoginedRoute;