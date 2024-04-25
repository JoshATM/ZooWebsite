import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the token from localStorage

    if (token) {
      fetch("http://localhost:5000/current-user", {
        method: "GET",
        credentials: "include", // Include credentials for cross-origin requests
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("No user is logged in");
          }
        })
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      throw new Error("No token found in localStorage");
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <p>
          Logged in as {user.firstName} {user.lastName} ({user.email})
        </p>
      ) : (
        <p>No user is logged in</p>
      )}
    </div>
  );
}
