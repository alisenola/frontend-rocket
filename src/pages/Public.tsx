import { Container, Typography } from "@mui/material";
import { getRockets } from "apis";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import {
  fetchRocketAction,
  IRocketState,
} from "store/features/rocket";
import { Card, CardContent, Grid } from "@mui/material";
import { Pagination } from "@mui/material";
import usePagination from "../hooks/PaginationHook";

const PER_PAGE = 2;

const Public: React.FC = () => {
  const dispatch = useDispatch();
  const { loaded, items: rockets } = useSelector<RootState, IRocketState>(
    (store) => store.rocket
  );

  const [page, setPage] = useState(1);

  const count = Math.ceil(rockets.length / PER_PAGE);

  const _DADA = usePagination(rockets, PER_PAGE);

  const handleChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
    _DADA.jump(page);
  };

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
          _DADA.currentData().map((rocket, idx) => (
            <Grid item lg={4} md={6} sm={12} key={idx}>
              <Card id="rocket-card" sx={{ mb: 2 }}>
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
              </Card>
            </Grid>
          ))}
      </Grid>
      <Pagination
        count={count}
        color="primary"
        page={page}
        onChange={handleChange}
      />
    </Container>
  );
};

export default Public;
