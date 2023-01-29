import { Paper, styled } from "@mui/material";

const InfoPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  boxSizing: "border-box",
}));

export default InfoPaper;
