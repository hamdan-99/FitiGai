import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = (props) => {
  return (
    <div className='page'>
      <Head>
        <title>Fitigai</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta
          name='keywords'
          content='Tennis,
  Volleyball,
  Football,
  Badminton,
  Disability Sport,
  Diving,
  Boxing,
  Judo,
  Swimming,
  Table Tennis,
  Taekwondo,
  Wrestling'
        />
        <meta
          name='description'
          content='Fitigai is a website aim to help sports lovers to easily search and find a professional sports coach in and around Belgium'
        />
        <link
          rel='stylesheet'
          href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'
          integrity='sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk'
          crossOrigin='anonymous'
        ></link>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/2.14.1/react-datepicker.min.css'
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
        />
        <script
          src='https://code.jquery.com/jquery-3.5.1.slim.min.js'
          integrity='sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj'
          crossOrigin='anonymous'
        ></script>
        <script
          src='https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js'
          integrity='sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo'
          crossOrigin='anonymous'
        ></script>
        <script
          src='https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js'
          integrity='sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI'
          crossOrigin='anonymous'
        ></script>
      </Head>
      <Navbar />
      {props.children}
      <Footer />
      <style jsx>{`
        .page {
          min-height: 100vh;
        }

        @media screen and (max-width: 480px) {
          .page {
            min-height: 90vh;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
