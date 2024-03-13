import React, { useState } from "react";
import styled from "styled-components";

export default function PersonType(props) {
  const [NumberOf, setNumberOf] = useState(0);
  const handleIncrement = () => {
    setNumberOf(NumberOf + 1);
  };
  const handleDecrement = () => {
    setNumberOf(NumberOf - 1);
    if (NumberOf <= 0) {
      setNumberOf(0);
    }
  };
  return (
    <CardContainer>
      <StyledText>{props.type}</StyledText>
      <Button onClick={handleDecrement}>-</Button>
      <span>{NumberOf}</span>
      <Button onClick={handleIncrement}>+</Button>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 1rem;
  padding: 1rem;
  text-align: center;
  width: 200px;
  height: 100px;
`;

const Button = styled.button`
  background: #22ff00;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  transition: 0.3s ease;
  &:hover {
    background: #00681c;
  }
`;

const StyledText = styled.p`
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
`;
