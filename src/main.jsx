import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/Home.jsx";
import EventRegistration from "./pages/EventRegistration.jsx";
import EventSpeaker from "./pages/EventSpeaker.jsx";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/event/:id",
        element: <EventRegistration />,
      },
      {
        path: "/pitches-requests",
        element: <EventSpeaker />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
