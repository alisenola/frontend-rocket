import { Container, Fab, Typography, useTheme } from "@mui/material";
import { getRockets, deleteRocket as apiDeleteRocket } from "apis";
import RocketDialog from "components/RocketDialog";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import {
  fetchRocketAction,
  deleteRocketAction,
  IRocketState,
} from "store/features/rocket";
import { Card, CardContent, CardActions, Button, Grid } from "@mui/material";
import { IRocket } from "interfaces/IRocket";

const defaultRocket: IRocket = {
  name: "",
  description: "",
  height: 0,
  diameter: 0,
  mass: 0,
};

const Admin: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { loaded, items: rockets } = useSelector<RootState, IRocketState>(
    (store) => store.rocket
  );

  const [openDialog, setOpenDialog] = useState(false);

  const [seletedRocket, setSeletedRocket] = useState<IRocket>(defaultRocket);

  const handleClose = useCallback(() => {
    setOpenDialog(false);
  }, []);

  const handleOpen = useCallback((item: IRocket = defaultRocket) => {
    setSeletedRocket(item);
    setOpenDialog(true);
  }, []);

  const deleteRocket = useCallback(
    (id: number) => {
      apiDeleteRocket(id).then(() => {
        dispatch(deleteRocketAction({ item: id }));
      });
    },
    [dispatch]
  );

  useEffect(() => {
    getRockets().then(({ data }) => {
      dispatch(fetchRocketAction({ item: data }));
    });
  }, [dispatch]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
        lg: 2,
      }}
    >
      <Grid container spacing={2}>
        {loaded &&
          rockets &&
          rockets.map((rocket, idx) => (
            <Grid item lg={4} md={6} sm={12} key={idx}>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {rocket.name}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {rocket.description}
                  </Typography>
                  <Typography sx={{ fontSize: 12 }} color="text.primary">
                    Height: {rocket.height} Diameter: {rocket.diameter} Mass:{" "}
                    {rocket.mass}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleOpen(rocket)}>
                    edit
                  </Button>
                  <Button size="small" onClick={() => deleteRocket(rocket.id!)}>
                    delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
      <Fab
        variant="extended"
        color="primary"
        sx={{
          position: "fixed",
          right: theme.spacing(6),
          bottom: theme.spacing(3),
        }}
        onClick={() => handleOpen()}
      >
        Add Rocket
      </Fab>

      {openDialog && (
        <RocketDialog
          open={openDialog}
          onClose={handleClose}
          item={seletedRocket}
        />
      )}
    </Container>
  );
};

export default Admin;
