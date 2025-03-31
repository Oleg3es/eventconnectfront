import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
function App() {
  return (
    <>
      <Header />
      <ToastContainer autoClose={2000} position="top-right" />
      <Outlet />
    </>
  );
}

export default App;
