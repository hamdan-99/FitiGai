import Layout from '../../components/Layout';
import Link from 'next/link';
import useTranslation from '../../hooks/useTranslation'
import WithLocaleWrapper from '../../hocs/withLocale'

const Contact = () => {
  const { locale, t } = useTranslation()

  return (
    <Layout>
      <div>
        <Link href="/[lang]/contact" as={`/${locale}/contact`}>
          <h1>{t('ContactPage')}</h1>
        </Link>
      </div>
    </Layout>
  );
};
export default WithLocaleWrapper(Contact);
