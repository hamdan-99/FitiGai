import React from "react";
import Card from "./Cards";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useTranslation from "../hooks/useTranslation";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
    marginTop: "1rem",
  },
});

const ResultsCard = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid
      container
      spacing={3}
      className={classes.gridContainer}
      justify="center"
    >
      <Grid item xs={12} sm={6} md={3}>
        <Card />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card />
      </Grid>
    </Grid>
  );
};

export default ResultsCard;
