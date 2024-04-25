import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: hashedPassword,
        }),
      });

      if (response.ok) {
        // User is authenticated, save the session token
        const { token } = await response.json();
        // Store the token securely on the client-side, such as in a secure HTTP-only cookie or in local storage
        // Example: document.cookie = `token=${token}; Secure; HttpOnly`;

        navigate("/dashboard");
      } else {
        console.error("Error logging in");
      }
    } catch (error) {
      console.error("Error logging in: " + error.message);
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <Label>
          Email:
          <Input type="email" value={email} onChange={handleEmailChange} />
        </Label>
        <Label>
          Password:
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Label>
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
}
const Container = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  color: black;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 5px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
`;
