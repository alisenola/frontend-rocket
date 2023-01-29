import CollectionsIcon from "@mui/icons-material/Collections";
import PeopleIcon from "@mui/icons-material/People";

interface NavigationItemConfig {
  label: string;
  icon?: React.ComponentType;
  to?: string;
  type?: string;
}

export const navigationConfig: NavigationItemConfig[] = [
  {
    type: "item",
    label: "A - Admin View",
    icon: CollectionsIcon,
    to: "/admin",
  },
  {
    type: "item",
    label: "B - Public View",
    icon: PeopleIcon,
    to: "/public",
  },
];
