import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DesirableSports from "../components/sports";
import Locations from "../components/locations";
import SelectedPrice from "../components/prices";
import LanguageSelect from "../components/languages";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
export default function AdvancedSearch() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6} md={3} sm={6}>
          <Paper className={classes.paper}>
            <DesirableSports />
          </Paper>
        </Grid>
        <Grid item xs={6} md={3} sm={6}>
          <Paper className={classes.paper}>
            {" "}
            <Locations />
          </Paper>
        </Grid>
        <Grid item xs={6} md={3} sm={6}>
          <Paper className={classes.paper}>
            <SelectedPrice />
          </Paper>
        </Grid>
        <Grid item xs={6} md={3} sm={6}>
          <Paper className={classes.paper}>
            <LanguageSelect />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
