import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import GamePage from "./pages/GamePage";
import AboutPage from "./pages/AboutPage";
import DocumentationPage from "./pages/DocumentationPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/game",
    element: <GamePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/documentation",
    element: <DocumentationPage />,
  },
]);
