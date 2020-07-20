import Layout from '../components/Layout';
import Link from 'next/link';

const Contact = () => {
  return (
    <Layout>
      <div>
        <Link href='/contact'>
          <h1>Contact Page</h1>
        </Link>
      </div>
    </Layout>
  );
};
export default Contact;
