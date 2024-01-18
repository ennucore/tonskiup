import styled from "styled-components";

export const Card = styled.div`
  padding: 18px 20px;
  border-radius: 8px;
  background-color: white;

  @media (prefers-color-scheme: dark) {
    background-color: #111;
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
  font-family: 'Raleway';
  font-weight: bold;
`;

export const Button = styled.button`
  background-color: ${(props) =>
    props.disabled ? "#6e6e6e" : "var(--tg-theme-button-color)"};
  border: 0;
  border-radius: 8px;
  padding: 20px 20px;
  color: var(--tg-theme-button-text-color);
  font-weight: 700;
  font-family: 'Raleway';
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

  @media (prefers-color-scheme: dark) {
    border: 1px solid #fefefe;
  }
`;
