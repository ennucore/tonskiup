import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, FlexBoxRow, FlexBoxCol, Button, Ellipsis, Input } from "./styled/styled";


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
  justify-content: space-around;
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

export const ContentBox = styled.div`
  width: 80%; /* Increase the width */
  max-width: 600px; /* Set a max-width for larger screens */
  margin: auto; /* Center the box */
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (prefers-color-scheme: dark) {
    background-color: #111;
  }
`;


export const DomainCard = styled.div`
    background-image: url(${props => props.picture});
    background-size: cover;
    background-position: center;
    border: ${props => props.active ? '3px solid #3399FF' : 'none'};
    height: ${props => props.active ? '150px' : '100px'};
    width: ${props => props.active ? '150px' : '100px'};
    margin: 1rem;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-3px);
        // make it bigger
        height: ${props => props.active ? '150px' : '115px'};
        width: ${props => props.active ? '150px' : '115px'};
        background-color: ${props => props.active ? '#3399FF' : '#CCC'};
    }
`;


export const DomainRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin-bottom: 20px;
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */

  &::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }
`;
