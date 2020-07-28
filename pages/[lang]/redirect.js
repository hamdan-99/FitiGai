import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import WithLocaleWrapper from '../../hocs/withLocale'
import useTranslation from '../../hooks/useTranslation'

// Current URL is '/'
function Page() {
  const router = useRouter();
  var [time, setTime] = useState(5);
  const { locale, t } = useTranslation()

  useEffect(() => {
    // Always do navigations after the first render
    setInterval(function () {
      time > -1
        ? setTime(time--)
        : router.push({
          pathname: `/${locale}`,
          query: { shallow: true }
        });
    }, 2000);
  }, []);

  useEffect(() => {
    // The counter changed!
  }, [router.query.counter]);

  return <h1>{time}</h1>;
}
export default WithLocaleWrapper(Page);
