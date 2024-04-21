import React, { useState } from "react";
import styled from "styled-components";

export default function SignIn() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("User created successfully");
        } else {
          alert("Error creating user");
        }
      })
      .catch((error) => {
        console.error("Error creating user: " + error);
        alert("Error creating user");
      });
  };

  return (
    <Container>
      <Title>Sign In</Title>
      <Form onSubmit={handleSubmit}>
        <Label>
          First Name:
          <Input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </Label>
        <Label>
          Last Name:
          <Input type="text" value={lastName} onChange={handleLastNameChange} />
        </Label>
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
        <Label>
          Confirm Password:
          <Input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </Label>
        <Button type="submit">Sign In</Button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
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
