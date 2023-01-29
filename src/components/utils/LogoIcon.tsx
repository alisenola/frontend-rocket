import { Box, BoxProps } from "@mui/material";
import { ReactComponent as Logo } from "logo.svg";

const LogoIcon: React.FC<BoxProps> = (props) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="50%"
      {...props}
    >
      <Logo />
    </Box>
  );
};

export default LogoIcon;
