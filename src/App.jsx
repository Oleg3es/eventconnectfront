import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import ButtonBurger from "./components/UI/button/ButtonBurger";
import Sidebar from "./components/UI/sidebar/Sidebar";

function App() {

  return (
    <>
      <ToastContainer autoClose={2000} position="top-right" />
      <Outlet />
    </>
  );
}

export default App;
