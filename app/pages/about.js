import Layout from '../components/Layout';
import Link from 'next/link';

const About = () => {
  return (
    <Layout>
      <div>
        <Link href='/about'>
          <h1>About Page</h1>
        </Link>
      </div>
    </Layout>
  );
};
export default About;
