import  Admin from "pages/Admin";
import Public from "pages/Public";
import { Navigate } from "react-router-dom";

export interface RouteConfig {
  path: string;
  element: JSX.Element;
  settings?: any;
  auth?: boolean;
  label?: string;
}

const onlyMain = {
  sidebar: false
};

const routesConfig: RouteConfig[] = [
  {
    path: "/",
    element: <Navigate to="/admin" />,
  },
  {
    path: "/admin",
    element: <Admin />,
    settings: {
      layout: onlyMain,
    }
  },
  {
    path: "/public",
    element: <Public />,
    label: "Public view",
  },
  {
    path: "*",
    element: <h1>Page not found.</h1>,
  },
];

export default routesConfig;
