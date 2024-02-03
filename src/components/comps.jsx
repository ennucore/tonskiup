import React, {useState} from 'react';
import styled from 'styled-components';
import {Card, FlexBoxRow, FlexBoxCol, Button, Ellipsis, Input} from "./styled/styled";


export const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 20px;
`;

export const DomainSelector = styled.select`
    padding: 10px 20px;
    border-radius: 10px;
    width: 100%;
    border: 1px solid #c2c2c2;
`;

export const HostingOptionTabs = styled(FlexBoxRow)`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;


export const Tab = styled(Button)`
    flex: 1;
    background-color: ${(props) =>
            props.active ? '#3399FF' : '#DDD'}; /* More pronounced color for active state */
    color: ${(props) => (props.active ? 'white' : '#333')};
    border-bottom: ${(props) =>
            props.active ? '4px solid #3399FF' : 'none'}; /* Bottom border for active tab */
    transition: background-color 0.3s, color 0.3s, border-bottom 0.3s;

    &:hover {
        background-color: ${(props) => (props.active ? '#3399FF' : '#CCC')};
        color: ${(props) => (props.active ? 'white' : '#333')};
    }
`;

export const StyledTab = styled(Tab)`
  width: 100%;

  @media (max-width: 768px) {
    width: 45%;
  }
`;

export const ContentBox = styled.div`
    width: 80%; /* Increase the width */
    max-width: 600px; /* Set a max-width for larger screens */
    margin: auto; /* Center the box */
    padding: 20px;
    border-radius: 8px;
    background-color:  var(--tg-theme-secondary-bg-color);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    @media (prefers-color-scheme: dark) {
        background-color: var(--tg-theme-bg-color);  // рамка
    }
`;


export const DomainCard = styled.div`
    background-image: url(${props => props.picture});
    background-size: cover;
    background-position: center;
    border: ${props => props.active ? '3px solid #3399FF' : 'none'};
    height: ${props => props.active ? '120px' : '90px'};
    width: ${props => props.active ? '120px' : '90px'};
    margin: 1rem;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    flex-shrink: 0;

    &:hover {
        transform: translateY(-3px);
        // make it bigger
        height: ${props => props.active ? '120px' : '100px'};
        width: ${props => props.active ? '120px' : '100px'};
        background-color: ${props => props.active ? '#3399FF' : '#CCC'};
    }
`;


export const DomainRow = styled.div`
    display: flex;
    margin-top: -35px;
    margin-bottom: -10px;
    overflow-x: scroll;
    width: 100%;
`;


// rounded template preview with an image: tem1.gif
export const TemplatePreview = styled.div`
    background-image: url(${props => props.picture});
    background-size: cover;
    background-position: center;
    border: 3px solid #3399FF;
    max-height: 150px;
    max-width: 150px;
    width: 100%;
    min-height: 10rem;
    min-width: 12rem;
    margin: 1rem;
    border-radius: 20px;
    transition: all 0.3s ease;
`;


const SwitchContainer = styled.div`
    width: 50px;
    height: 25px;
    background-color: ${(props) => (props.active ? '#4CAF50' : '#ccc')};
    border-radius: 25px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.active ? 'flex-end' : 'flex-start')};
    padding: 3px;
    transition: background-color 0.3s, justify-content 0.3s;
`;

const SwitchKnob = styled.div`
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: all 0.3s;
`;

export const Switch = ({initialState = false, onToggle}) => {
    const [active, setActive] = useState(initialState);

    const toggleSwitch = () => {
        setActive(!active);
        if (onToggle) {
            onToggle(!active);
        }
    };
    return (
        <SwitchContainer active={active} onClick={toggleSwitch}>
            <SwitchKnob/>
        </SwitchContainer>
    );
};
