import {
  Box,
  Button,
  Drawer,
  Hidden,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { useCallback, useMemo } from "react";
import { navigationConfig } from "config/navigation";
import { Link, useLocation } from "react-router-dom";
import LogoIcon from "components/utils/LogoIcon";
import { ChevronLeft } from "@mui/icons-material";
import classNames from "classnames";
import { SidebarState, toggleFolded, toggleOpen } from "store/features/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { folded, open } = useSelector<RootState, SidebarState>(
    (state) => state.sidebar
  );

  const theme = useTheme();

  const navItems = useMemo(() => {
    return navigationConfig.map(({ label, to, icon: ItemIcon }) => (
      <ListItemButton
        key={to}
        component={Link}
        to={to as string}
        sx={{ color: "black" }}
        selected={to === pathname}
      >
        {ItemIcon && (
          <ListItemIcon>
            <ItemIcon></ItemIcon>
          </ListItemIcon>
        )}
        <ListItemText sx={{ whiteSpace: "nowrap" }}>{label}</ListItemText>
      </ListItemButton>
    ));
  }, [pathname]);

  const toggleSidebarFolded = useCallback(() => {
    dispatch(toggleFolded());
  }, [dispatch]);

  return (
    <>
      <Hidden smDown>
        <Drawer
          sx={{
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              justifyContent: "space-between",
              transition: theme.transitions.create(["width"], {
                duration: theme.transitions.duration.standard,
              }),
            },
            "&.collapsed .MuiDrawer-paper": {
              width: 56,
              overflow: "hidden",
            },
          }}
          className={classNames({ collapsed: folded })}
          variant="permanent"
          anchor="left"
        >
          <Box>
            <Toolbar
              sx={{
                padding: "0px 8px !important",
                display: "-webkit-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <LogoIcon bgcolor="primary.main" width="40px" height="40px" />
              <Typography variant="h6" ml={3}>
                E-Rocket
              </Typography>
            </Toolbar>

            <List>{navItems}</List>
          </Box>

          <Box display="flex" flexDirection="row" justifyContent="flex-end">
            <Button onClick={() => toggleSidebarFolded()}>
              {folded ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </Box>
        </Drawer>
      </Hidden>

      <Hidden mdUp>
        <Drawer
          sx={{
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              justifyContent: "space-between",
              transition: theme.transitions.create(["width"], {
                duration: theme.transitions.duration.standard,
              }),
            },
          }}
          variant="temporary"
          anchor="left"
          open={open}
          onClose={() => dispatch(toggleOpen())}
        >
          <Box>
            <Toolbar
              sx={{
                padding: "0px 8px !important",
                display: "-webkit-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <LogoIcon bgcolor="primary.main" width="40px" height="40px" />
              <Typography variant="h6" ml={3}>
                E-Parent
              </Typography>
            </Toolbar>

            <List>{navItems}</List>
          </Box>

          <Hidden mdDown>
            <Box display="flex" flexDirection="row" justifyContent="flex-end">
              <Button onClick={() => toggleSidebarFolded()}>
                {folded ? <ChevronRight /> : <ChevronLeft />}
              </Button>
            </Box>
          </Hidden>
        </Drawer>
      </Hidden>
    </>
  );
};

export default Sidebar;
