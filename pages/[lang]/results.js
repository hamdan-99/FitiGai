// import data from "../../utils/data.js";
import profile from "../../utils/data.js";
import fetch from "node-fetch";
import Card from "../../components/Cards";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../components/Layout";
import Pagination from "../../components/pagination";
import { useState } from "react";
import { paginate } from "../../utils/paginate";
import Router from "next/router";
import { useRouter } from "next/router";
import WithLocaleWrapper from "../../hocs/withLocale";
import useTranslation from "../../hooks/useTranslation";
import AdvancedSearch from "../../components/advancedSearch";

const urlEndpoint = `https://fitigai-api.herokuapp.com/v1/`;

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
    marginTop: "1rem",
  },
});

const Results = (props) => {
  let [count, SetCount] = useState(props.data.results.length);
  let [counts, SetCounts] = useState(props.data.ress.length);
  let [pageSize, SetPageSize] = useState(12);
  let [currentPage, SetCurrentPage] = useState(1);
  let [pagiress, SetPagiress] = useState(
    paginate(props.data.ress, currentPage, pageSize)
  );
  let [pagiData, SetPagiData] = useState();
  console.log(" propsprops", props);
  const router = useRouter();
  const { locale, t } = useTranslation();

  const classes = useStyles();
  const handlePageChange = (page) => {
    SetCurrentPage(page);
  };
  // pagiress = ;
  pagiData = paginate(props.data.results, currentPage, pageSize);

  const handleClick = (coachID, serviceID) => {
    console.log("coachID", coachID.lang, "serviceID", serviceID);
    profile.push(coachID);
    profile.push(serviceID);

    router.push({
      pathname: `/${locale}/profile`,
      query: {
        _id: serviceID._id,
        location: serviceID.location,
        owner: serviceID.owner,
        title: serviceID.title,
        description: serviceID.description,
        price: serviceID.price,
        address: serviceID.address,
        lang: coachID.lang,
        firstName: coachID.firstName,
        lastName: coachID.lastName,
      },
    });
  };

  return (
    <div>
      {pagiData.length > 0 && (
        <Layout>
          <AdvancedSearch></AdvancedSearch>
          <div>
            <Grid className={classes.gridContainer}>
              <Grid>
                <Grid container justify="center" spacing={4}>
                  {pagiData.map((card) =>
                    props.data.coaches.map((coach) =>
                      card.owner === coach._id ? (
                        <Grid
                          onClick={(e) => handleClick(coach, card)}
                          key={card._id}
                          item
                          xs={3}
                        >
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

      {/* *******************************************************************
      {pagiress.length > 0 && (
        <Layout>
          <div>
            <Grid className={classes.gridContainer}>
              <Grid>
                <Grid container justify="center" spacing={4}>
                  {pagiress.map((all) =>
                    props.props.coaches.map((coach) =>
                      all.owner === coach._id ? (
                        <Grid
                          onClick={(e) => handleClick(coach, all)}
                          key={all._id}
                          item
                          xs={3}
                        >
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
      )} */}
    </div>
  );
};

Results.getInitialProps = async ({ query }) => {
  const res = await fetch(`${urlEndpoint}coach/coaches`);
  const coaches = await res.json();
  const response = await fetch(`${urlEndpoint}searches`);
  const services = await response.json();
  // console.log("services", services ,'\n','coaches',coaches);
  const ress = [];
  const results = services.filter((i, e) => {
    console.log("querys", i);
    if (
      query.title === i.title.toLowerCase() &&
      query.location === i.location.toLowerCase()
    ) {
      return i;
      // } else if (query.title !== i.title.toLowerCase()) {
      //   return (query.title = undefined);
      // } else if (query.title === undefined) {
      //   // return ress.push(services[0]);
      //   if (e < 32) {
      //     return i;
      //   }
    }
  });

  return {
    data: { coaches, ress, results, query },
  };
};

export default WithLocaleWrapper(Results);
