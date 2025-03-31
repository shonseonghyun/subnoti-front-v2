import { ClipLoader } from "react-spinners";
import styled from "styled-components";

const Container = styled.div`
`;

const LogoContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Overlay = styled.div`
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    background-color: black;
    opacity: 0.05;
`;

const AppLoading = () => {
    return (
        <Container>
            <Overlay />
            <LogoContainer>
                <ClipLoader color='#9747FF'/>
            </LogoContainer>
        </Container>
    );
};

export default AppLoading;