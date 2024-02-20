import styled from "styled-components";
import {TonConnectButton} from "@tonconnect/ui-react";
import {CHAIN} from "@tonconnect/protocol";
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface ButtonContainerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  network?: CHAIN | null;
}

export const Card = styled.div`
  padding: 18px 20px;
  border-radius: 8px;
  background-color: white;

  @media (prefers-color-scheme: dark) {
    background-color: var(--tg-theme-bg-color)
  }
`;

export const FlexBoxRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const FlexBoxCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: 'GothamRounded';
  font-weight: normal;
  color: var(--tg-theme-text-color);
`;

export const Button = styled.button`
  background-color: ${(props) =>
    props.disabled ? "#6e6e6e" : "var(--tg-theme-button-color)"};
  border: 0;
  border-radius: 8px;
  padding: 20px 20px;
  color: var(--tg-theme-button-text-color);
  font-weight: normal;
  font-family: 'GothamRounded';
  cursor: pointer;
  pointer-events: ${(props) => (props.disabled ? "none" : "inherit")};
  white-space: nowrap;
`;

export const Ellipsis = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;


export const Input = styled("input")`
  padding: 10px 20px;
  border-radius: 10px;
  width: calc(100% - 40px); /* Adjust width to account for padding */
  border: 1px solid #c2c2c2;
  font-family:'GothamRounded';
  color: #4d4d4d;

  @media (prefers-color-scheme: dark) {
    border: 1px solid #a1a1a1;
  }
`;

export const ButtonContainer = styled.div<ButtonContainerProps>`
  position: absolute;
  top: 25px;
  right: 20px;
  display: flex;
  justify-content: ${(props) => (props.network ? 'flex-start' : 'center')};
  width: ${(props) => (props.network ? 'auto' : '100%')};

  @media (min-width: 768px) { /* 768px and up */
    right: 50px;
  }

  @media (min-width: 1024px) { /* 1024px and up */
    right: 70px;
  }
`;

export const TonConnectButtonDiv = styled(TonConnectButton)`
  margin-left: 20px;
`;

export const NetButton = styled(Button)`
  margin-top: -7px; 
`;
