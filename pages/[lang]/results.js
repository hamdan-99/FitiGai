// import data from "../../utils/data.js";
import Card from "../../components/Cards";
import { paginate } from "../../utils/paginate";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../components/Layout";
import Pagination from "../../components/pagination";
import { useState } from "react";
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

const Results = ({ results, services, coaches, query }) => {
  let [service, SetService] = useState(services);
  let [count, SetCount] = useState(results.length);
  let [pageSize, SetPageSize] = useState(12);
  let [currentPage, SetCurrentPage] = useState(1);
  let [pagiData, SetPagiData] = useState(
    paginate(results, currentPage, pageSize)
  );
  console.log(" propsprops", pagiData);
  if (pagiData.length === 0) {
    SetCount(service.length);
    SetPagiData(paginate(service, currentPage, pageSize));
  }

  const router = useRouter();
  const { locale, t } = useTranslation();

  const classes = useStyles();
  const handlePageChange = (page) => {
    SetCurrentPage(page);
  };

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
      <Layout>
        <div>
          <Grid container justify="center" spacing={2} className={classes.gridContainer}>
                {pagiData.map((card) =>
                  coaches.map((coach) =>
                    card.owner === coach._id ? (
                      <Grid
                        onClick={(e) => handleClick(coach, card)}
                        key={card._id}
                        item xs={3}
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
    </div>
  );
};

Results.getInitialProps = async ({ query }) => {
  const res = await fetch(`${urlEndpoint}coach/coaches`);
  const coaches = await res.json();
  const response = await fetch(`${urlEndpoint}searches`);
  const services = await response.json();
  // console.log("services", services ,'\n','coaches',coaches);
  const results = services.filter((i, e) => {
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
    } else {
      return null;
    }
  });

  return {
    coaches,
    services,
    results,
    query,
  };
};

export default WithLocaleWrapper(Results);
