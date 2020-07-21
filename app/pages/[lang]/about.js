import Layout from '../../components/Layout';
import Link from 'next/link';
import WithLocaleWrapper from '../../hocs/withLocale'
import useTranslation from '../../hooks/useTranslation'

const About = () => {
  const { locale, t } = useTranslation()

  return (
    <Layout>
      <div>
        <h1>{t('AboutPage')}</h1>
      </div>
    </Layout>
  );
};
export default WithLocaleWrapper(About);
