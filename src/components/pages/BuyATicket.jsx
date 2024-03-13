import React from "react";
import styled from "styled-components";
import PersonType from "../PersonType";
import PickADate from "../PickADate";

export default function BuyATicket() {
  return (
    <>
      <p>Buy a Ticket</p>
      <PickADate />
      <p>Type:</p>
      <PersonType type="Adult" />
    </>
  );
}
