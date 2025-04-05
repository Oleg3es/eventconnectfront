import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useScrollToTop from "./components/hooks/useScrollToTop";

function App() {
  useScrollToTop();

  return (
    <>
      <ToastContainer autoClose={2000} position="top-right" />
      <Outlet />
    </>
  );
}

export default App;
