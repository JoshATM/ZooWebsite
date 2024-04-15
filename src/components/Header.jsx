import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <h1>ZOO</h1>
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/tickets")}>Buy a Ticket</button>
      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      <button onClick={() => navigate("/materials")}>Materials</button>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  background: linear-gradient(90deg, #22ff00, #00681c);
  color: #fff;
  padding: 1rem;
  text-align: center;
`;
