import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

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
    </>
  );
};
