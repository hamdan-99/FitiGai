import React from "react";
import Layout from "../../components/Layout";
import WithLocaleWrapper from "../../hocs/withLocale";
import useTranslation from "../../hooks/useTranslation";
import ValidateLoginForm from '../../components/ValidateLoginForm'

const Login = () => {
  const { locale, t } = useTranslation();
  return (
    <Layout>
      <ValidateLoginForm t={t} locale={locale} />
    </Layout>
  );
};

export default WithLocaleWrapper(Login);
