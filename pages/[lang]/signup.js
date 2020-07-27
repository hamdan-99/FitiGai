import React from "react";
import Layout from "../../components/Layout";
import WithLocaleWrapper from "../../hocs/withLocale";
import useTranslation from "../../hooks/useTranslation";
import ValidateSignUpForm from '../../components/ValidateSignUpForm'

const Signup = () => {
  const { locale, t } = useTranslation();

  return (
    <Layout>
      <ValidateSignUpForm t={t} locale={locale} />
    </Layout >
  );
};

export default WithLocaleWrapper(Signup);
