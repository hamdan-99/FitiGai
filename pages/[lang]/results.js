// import Card from '../../components/Cards';
// import { Grid } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import Layout from '../../components/Layout';
// import Pagination from '../../components/pagination';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import WithLocaleWrapper from '../../hocs/withLocale';
// import useTranslation from '../../hooks/useTranslation';
// import AdvancedSearch from '../../components/advancedSearch';

// const urlEndpoint = `https://fitigai-api.herokuapp.com/v1/`;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   gridContainer: {
//     marginTop: '3rem',
//     paddingLeft: '40px',
//     paddingRight: '40px',
//   },
// }));

// const Results = ({ services, coaches, title, location }) => {
//   const router = useRouter();
//   const { locale, t } = useTranslation();
//   const classes = useStyles();

//   let [number, setNumber] = useState(services.map((i) => i.price))
//   let [a_title, setTitle] = useState(title)
//   let [a_location, setLocation] = useState(location)
//   let [a_language, setLanguage] = useState(['EN', 'FR'])
//   let [a_maxPrice, setMaxPrice] = useState(Math.max(...number))
//   let [a_minPrice, setMinPrice] = useState(Math.min(...number))
//   let [clicked, setClicked] = useState(0)

//   let [results, setResults] = useState(
//     services.filter((i, e) => {
//       if (i.title.toLowerCase().includes(a_title.toLowerCase())) {
//         if (i.location.toLowerCase().includes(a_location.toLowerCase())) {
//           let coach = coaches.find(x => x._id === i.owner)
//           if (coach) {
//             if (a_language.includes(coach.lang.slice(0, 2).toUpperCase())) {
//               if (i.price >= a_minPrice && i.price <= a_maxPrice)
//                 return i;
//             }
//           }
//         }
//       }
//       return null;
//     })
//   );


//   useEffect(() => {
//     setResults(services.filter((i, e) => {
//       if (i.title.toLowerCase().includes(a_title.toLowerCase())) {
//         if (i.location.toLowerCase().includes(a_location.toLowerCase())) {
//           let coach = coaches.find(x => x._id === i.owner)
//           if (coach) {
//             if (a_language.includes(coach.lang.slice(0, 2).toUpperCase())) {
//               if (i.price >= a_minPrice && i.price <= a_maxPrice)
//                 return i;
//             }
//           }
//         }
//       }
//       return null;
//     }))
//   }, [clicked])



//   const b = [];
//   let [a, setA] = useState({ as: [] });
//   if (a.as.length >= 0) {
//     a.as.map((i) => b.push(i));
//   } else {
//     return null;
//   }

//   useEffect(() => {
//     if (results.length === 0)
//       setResults(services.map((i, e) => (e < 32 ? i : null)));
//   }, [results]);

//   let [pageSize, SetPageSize] = useState(9);
//   let [currentPage, SetCurrentPage] = useState(1);

//   useEffect(() => {
//     SetCurrentPage(1);
//   }, [results]);

//   const handlePageChange = (page) => {
//     SetCurrentPage(page);
//   };

//   const handleClick = (coachID, serviceID) => {
//     router.push({
//       pathname: `/${locale}/profile`,
//       query: {
//         _id: serviceID._id,
//         location: serviceID.location,
//         owner: serviceID.owner,
//         title: serviceID.title,
//         description: serviceID.description,
//         price: serviceID.price,
//         address: serviceID.address,
//         lang: coachID.lang,
//         firstName: coachID.firstName,
//         lastName: coachID.lastName,
//       },
//     });
//   };

//   return (
//     <Layout>
//       <div className='wrapper'>
//         <div className='container'>
//           <AdvancedSearch
//             clicked={clicked}
//             setClicked={setClicked}
//             title={a_title}
//             setTitle={setTitle}
//             location={a_location}
//             setLocation={setLocation}
//             language={a_language}
//             setLanguage={setLanguage}
//             max={a_maxPrice}
//             setMax={setMaxPrice}
//             min={a_minPrice}
//             setMin={setMinPrice}
//           />

//           <Grid
//             container
//             spacing={5}
//             justify='center'
//             className={classes.gridContainer}
//           >
//             {results
//               .slice((currentPage - 1) * pageSize, currentPage * pageSize)
//               .map((card) =>
//                 coaches.map((coach) =>
//                   card.owner === coach._id ? (
//                     <Grid
//                       key={card._id}
//                       onClick={() => handleClick(coach, card)}
//                       item
//                       xs={12}
//                       sm={6}
//                       md={4}
//                     >
//                       <Card card={card} coachName={coach} key={card._id} />
//                     </Grid>
//                   ) : null
//                 )
//               )}
//           </Grid>

//           <div className='pagination'>
//             <Pagination
//               className='pagination'
//               itemsCount={results.length}
//               pageSize={pageSize}
//               onPageChange={handlePageChange}
//               currentPage={currentPage}
//             />
//           </div>
//         </div>
//         <style jsx>
//           {`
//             .wrapper {
//               background-color: aliceblue;
//             }
//           `}
//         </style>
//       </div>
//     </Layout>
//   );
// };

// Results.getInitialProps = async ({ query }) => {
//   const coaches_res = await fetch(`${urlEndpoint}coach/coaches`);
//   const coaches = await coaches_res.json();
//   const services_res = await fetch(`${urlEndpoint}searches`);
//   const services = await services_res.json();

//   return {
//     coaches,
//     services,
//     title: query.title,
//     location: query.location,
//   };
// };

// export default WithLocaleWrapper(Results);



import Card from '../../components/Cards';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../../components/Layout';
import Pagination from '../../components/pagination';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import WithLocaleWrapper from '../../hocs/withLocale';
import useTranslation from '../../hooks/useTranslation';
import AdvancedSearch from '../../components/advancedSearch';

const urlEndpoint = `https://fitigai-api.herokuapp.com/v1/`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridContainer: {
    marginTop: '5vh',
    paddingLeft: '40px',
    paddingRight: '40px',
  },
}));

const Results = ({ services, coaches, title, location }) => {
  const router = useRouter();
  const { locale, t } = useTranslation();
  const classes = useStyles();

  let [results, setResults] = useState(
    services.filter((i, e) => {
      if (title === i.title.toLowerCase())
        if (location === "") return i;
        else if (location === i.location.toLowerCase()) return i;
        else return null;
    })
  );

  let [pageSize, SetPageSize] = useState(12);
  let [currentPage, SetCurrentPage] = useState(1);


  useEffect(() => {
    console.log('PASSED RESULTS', results)
    SetCurrentPage(1);
    if (results.length === 0)
      setResults(services.map((i, e) => (e < 32 ? i : null)));
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
      <div className='wrapper'>
        <div className='container'>
          <AdvancedSearch
            services={services}
            coaches={coaches}
            className={classes.advance}
            setResults={setResults}
            initialProps={[title, location]}
          />

          <Grid
            container
            spacing={5}
            justify='center'
            className={classes.gridContainer}
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

          <div className='pagination'>
            <Pagination
              className='pagination'
              itemsCount={results.length}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
        <style jsx>
          {`
            .wrapper {
              background-color: aliceblue;
            }
          `}
        </style>
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