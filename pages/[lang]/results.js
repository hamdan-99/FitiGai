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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position:"relative"
  },
 
  control: {
    padding: theme.spacing(3),
  },
}));

const Results = ({ services, coaches, title, location }) => {
  const router = useRouter();
  const { locale, t } = useTranslation();
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  let [results, setResults] = useState(
    services.filter((i, e) => {
      if (title === i.title.toLowerCase())
        if (location === "") return i;
        else if (location === i.location.toLowerCase()) return i;
        else return null;
    })
  );

  useEffect(() => {
    if (results.length === 0)
      setResults(services.map((i, e) => (e < 32 ? i : null)));
  }, [results]);

  let [pageSize, SetPageSize] = useState(9);
  let [currentPage, SetCurrentPage] = useState(1);

  useEffect(() => {
    SetCurrentPage(1);
  }, [results]);

  const handlePageChange = (page) => {
    SetCurrentPage(page);
  };

  const handleClick = (coachID, serviceID) => {
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
    <Layout>
      <div>
        <AdvancedSearch className={classes.advance} />
        <div className="MuiGrid-root makeStyles-root-17 MuiGrid-container MuiGrid-spacing-xs-2">
          <div className='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12'>
            <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2">
              <Grid container className={classes.root} spacing={3}>
                <Grid item xs={12}>
                  <Grid container justify="center" spacing={spacing}>
                    {results
                      .slice(
                        (currentPage - 1) * pageSize,
                        currentPage * pageSize
                      )
                      .map((card) =>
                        coaches.map((coach) =>
                          card.owner === coach._id ? (
                            <Grid onClick={() => handleClick(coach, card)} item>
                              <Card
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
          </div>
        </div>
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
