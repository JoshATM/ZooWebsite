import React from "react";
import styled from "styled-components";

export default function SignOut() {
  function LogOut() {
    fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Logged out");
        } else {
          console.error("Error logging out");
        }
      })
      .catch((error) => {
        console.error("Error logging out: " + error.message);
      });
  }

  return <Button onClick={LogOut}>SignOut</Button>;
}

const Button = styled.button`
  background-color: red;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
`;
