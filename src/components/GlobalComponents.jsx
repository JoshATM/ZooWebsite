import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import SignOut from "./SignOut";

export default function GlobalComponents() {
  return (
    <>
      <DisplayAll />
      <Outlet />
    </>
  );
}

const DisplayAll = () => {
  return (
    <>
      <Header />
      <SignOut />
    </>
  );
};
