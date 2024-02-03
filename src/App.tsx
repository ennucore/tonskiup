import "./App.css";
import {TonConnectButton} from "@tonconnect/ui-react";
// @ts-ignore
import {Hosting} from "./components/Hosting.jsx";
import styled from "styled-components";
import {NetButton, FlexBoxCol, FlexBoxRow, TonConnectButtonDiv, ButtonContainer} from "./components/styled/styled";
import {useTonConnect} from "./hooks/useTonConnect";
import {CHAIN} from "@tonconnect/protocol";
import "@twa-dev/sdk";

const StyledApp = styled.div`
    background-color: #e8e8e8;
    color: black;

    @media (prefers-color-scheme: dark) {
        background-color: var(--tg-theme-secondary-bg-color);
        color: white;
    }
    min-height: 100vh;
    padding: 20px 20px;
`;

const AppContainer = styled.div`
    max-width: 900px;
    margin: 0 auto;
`;

function App() {
    const {network} = useTonConnect();

    return (
        <StyledApp>
            <AppContainer>
                <FlexBoxCol>
                    <FlexBoxRow>
                        <ButtonContainer network = {network}>
                            {network && (<NetButton>
                                {network === CHAIN.MAINNET
                                    ? "mainnet"
                                    : "testnet"
                                }
                            </NetButton>)}
                            <TonConnectButtonDiv/>
                        </ButtonContainer>
                    </FlexBoxRow>
                    <Hosting/>
                </FlexBoxCol>
            </AppContainer>
        </StyledApp>
    );
}

export default App;
