import Card from '../../components/Cards';
import { paginate } from '../../utils/paginate';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../../components/Layout';
import Pagination from '../../components/pagination';

import { useRouter } from 'next/router';

import AdvancedSearch from '../../components/advancedSearch';

const urlEndpoint = `https://fitigai-api.herokuapp.com/v1/`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridContainer: {
    marginTop: '3rem',
    paddingLeft: '20px',
    paddingRight: '20px',
  },

  control: {
    padding: theme.spacing(1),
  },
}));

const advancedResults = ({ services, coaches, props }) => {
  const router = useRouter();
  const { locale, t } = useTranslation();
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  let [results, setResults] = useState([]);

console.log('props',props)

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
      <div className='container'>
        <AdvancedSearch
          services={services}
          coaches={coaches}
          className={classes.advance}
        />

        <Grid
          container
          spacing={10}
          className={classes.gridContainer}
          justify='center'
        >
          {results
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((card) =>
              coaches.map((coach) =>
                card.owner === coach._id ? (
                  <Grid
                    key={card._id}
                    onClick={() => handleClick(coach, card)}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                  >
                    <Card card={card} coachName={coach} key={card._id} />
                  </Grid>
                ) : null
              )
            )}
        </Grid>
      </div>
      <div className='pagination'>
        {/* <Pagination
          className='pagination'
          itemsCount={results.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        /> */}
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
    services
  
  };
};

export default WithLocaleWrapper(advancedResults);
