import { SvgIcon, SvgIconProps } from "@mui/material";
import { ReactComponent as Nappy } from "nappy.svg";

const NappyIcon: React.FC<SvgIconProps> = (props) => {
  return <SvgIcon component={Nappy} {...props} inheritViewBox />;
};

export default NappyIcon;
