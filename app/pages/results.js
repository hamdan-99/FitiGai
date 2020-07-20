import data from "./data.js";
import Card from "../components/Cards";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../components/Layout";
import Pagination from "./../components/pagination";
import { useState } from "react";
import { paginate } from "./../utils/paginate";
import Router from "next/router";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
    marginTop: "1rem",
  },
});

const Results = (props) => {
  let [count, SetCount] = useState(data.length);
  let [counts, SetCounts] = useState(props.props.ress.length);
  let [pageSize, SetPageSize] = useState(12);
  let [currentPage, SetCurrentPage] = useState(1);
  let [pagiress, SetPagiress] = useState();
  let [pagiData, SetPagiData] = useState();

  const classes = useStyles();
  const handlePageChange = (page) => {
    SetCurrentPage(page);
  };
  pagiress = paginate(props.props.ress, currentPage, pageSize);
  pagiData = paginate(data, currentPage, pageSize);
  return (
    <div>
      {pagiData.length > 0 && (
        <Layout>
          <div>
            <Grid className={classes.gridContainer}>
              <Grid>
                <Grid container justify="center" spacing={4}>
                  {pagiData.map(
                    (card) =>
                      props.props.coaches.map((coach) =>
                        card.owner === coach._id ? (
                          <Grid key={card._id} item xs={3}>
                            <Card
                              className={classes.paper}
                              card={card}
                              coachName={coach}
                              key={card._id}
                            />
                          </Grid>
                        ) : null
                      )
                  )}
                </Grid>
              </Grid>
            </Grid>
          </div>
          <div className="pagination">
            <Pagination
              className="pagination"
              itemsCount={count}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </Layout>
      )}

      {/* ******************************************************************* */}
      {pagiress.length > 0 && (
        <Layout>
          <div>
            <Grid className={classes.gridContainer}>
              <Grid>
                <Grid container justify="center" spacing={4}>
                  {pagiress.map((all) =>
                    props.props.coaches.map((coach) =>
                      all.owner === coach._id ? (
                        <Grid key={all._id} item xs={3}>
                          <Card
                            className={classes.paper}
                            all={all}
                            coachName={coach}
                            key={all._id}
                          />
                        </Grid>
                      ) : null
                    )
                  )}
                </Grid>
              </Grid>
            </Grid>
          </div>
          <div className="pagination">
            <Pagination
              className="pagination"
              itemsCount={counts}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </Layout>
      )}
    </div>
  );
};

Results.getInitialProps = async ({ query }) => {
  const res = await fetch("http://localhost:5555/v1/coach/coaches");
  const coaches = await res.json();
  const response = await fetch("http://localhost:5555/v1/service/");
  const services = await response.json();
  const ress = [];
  if (query.exTitle === undefined) {
    return ress.push(services[0]);
  }
  services.filter((i, e) => {
    if (query.exTitle !== "") {
      if (query.exTitle.toLowerCase() !== i.title.toLowerCase()) {
        if (e < 32) {
          return ress.push(i);
        }
      }
    }
  });
  return {
    props: { coaches, ress },
  };
};

export default Results;
