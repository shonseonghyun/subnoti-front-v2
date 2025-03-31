import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuthStore } from '../zustand/AuthUserInfo';
import TokenHeaderInterceptor from './TokenHeaderInterceptor';

const PrivateRoute = () => {
    const isLogin = useAuthStore((state) => !!state.authUserInfo.accessToken);
    const currentLocation = useLocation();
    
    return isLogin 
        ? //로그인 되어있다면 원하는 페이지 마운트
        /*
                axios 요청 인터셉터를 통한 토큰 세팅 도맡은 TokenHeader
                부모,자식 관계 또는 자식 간의 관계로 구성할지 결정해야 한다. 
                부모,자식 관계로 구성할 시 컴포넌트 실행 순서로 인해 문제가 발생한다. (참고.https://velog.io/@dram26/%EB%A6%AC%EC%95%A1%ED%8A%B8-lifecycle-%EC%A0%95%EB%A6%AC-feat.-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%8B%A4%ED%96%89%EC%88%9C%EC%84%9C%EC%99%80-useEffect)
                자식 간의 관계로 구성 결정 확정
            */

            // <TokenHeader>
            //     <Outlet />
            // </TokenHeader> 
        (
            <>
                <TokenHeaderInterceptor />
                <Outlet />
            </>
        ) : (
            <Navigate to="/auth/login" replace state={{ redirectedFrom: currentLocation }} />
        );
};

export default PrivateRoute;
