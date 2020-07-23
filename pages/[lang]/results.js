import Card from "../../components/Cards";
import { paginate } from "../../utils/paginate";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../components/Layout";
import Pagination from "../../components/pagination";
import { useState, useEffect } from "react";
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

const Results = ({ services, coaches, title, location }) => {
  const router = useRouter();
  const { locale, t } = useTranslation();
  const classes = useStyles();

  let [results, setResults] = useState(services.filter((i, e) => {
    if (title === i.title.toLowerCase())
      if (location === '')
        return i
      else if (location === i.location.toLowerCase())
        return i;
      else
        return null;
  }))

  useEffect(()=>{if(results.length === 0) setResults(services)},[results])

  let [pageSize, SetPageSize] = useState(12);
  let [currentPage, SetCurrentPage] = useState(1);

  useEffect(() => { SetCurrentPage(1) }, [results])

  const handlePageChange = (page) => {
    SetCurrentPage(page);
  };

  const handleClick = (coachID, serviceID) => {
    console.log("coachID", coachID.lang, "serviceID", serviceID);

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
    <AdvancedSearch/>
        <div>
          <Grid container justify="center" spacing={2} className={classes.gridContainer}>
            {results.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((card) =>
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
            itemsCount={results.length}
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
  const coaches_res = await fetch(`${urlEndpoint}coach/coaches`);
  const coaches = await coaches_res.json();
  const services_res = await fetch(`${urlEndpoint}searches`);
  const services = await services_res.json();

  return {
    coaches,
    services,
    title: query.title,
    location: query.location,

  };
};

export default WithLocaleWrapper(Results);
