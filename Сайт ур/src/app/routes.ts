import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./pages/Home";
import About from "./pages/About";
import Requirements from "./pages/Requirements";
import Apply from "./pages/Apply";
import Profile from "./pages/Profile";
import Applications from "./pages/Applications";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "requirements", Component: Requirements },
      { path: "apply", Component: Apply },
      { path: "profile", Component: Profile },
      { path: "applications", Component: Applications },
    ],
  },
]);