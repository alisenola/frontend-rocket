import Sidebar from "./Sidebar";
import routesConfig from "../../config/routes";
import {
  matchRoutes,
  renderMatches,
  useLocation,
} from "react-router";
import { useEffect, useMemo, useState } from "react";
import layoutConfig from "../../config/layout";
import { RootState } from "store";
import { SidebarState } from "store/features/sidebar";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { Box, useTheme } from "@mui/material";

const Layout: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();

  const { folded } = useSelector<RootState, SidebarState>(
    (state) => state.sidebar
  );

  const matches = useMemo(() => {
    return matchRoutes(routesConfig, location);
  }, [location]);

  const [layout, setLayout] = useState(layoutConfig.default);

  return (
    <div>
      {layout.sidebar && <Sidebar />}

      <Box
        component="main"
        sx={{
          bgcolor: "grey.100",
          height: "100vh",
          overflow: "auto",
          marginLeft: layout.sidebar ? "240px" : "0px",
          transition: theme.transitions.create(["marginLeft"], {
            duration: theme.transitions.duration.standard,
          }),
          [theme.breakpoints.down("sm")]: {
            margin: 0,
          },
          "&.folded": {
            marginLeft: "56px",
            [theme.breakpoints.down("sm")]: {
              margin: 0,
            },
          },
        }}
        className={classNames({ folded })}
      >
        {renderMatches(matches)}
      </Box>
    </div>
  );
};

export default Layout;
