import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Current URL is '/'
function Page() {
  const router = useRouter();
  var [time, setTime] = useState(5);

  useEffect(() => {
    // Always do navigations after the first render
    setInterval(function () {
      time > -1
        ? setTime(time--)
        : router.push("/", undefined, { shallow: true });
    }, 2000);
  }, []);

  useEffect(() => {
    // The counter changed!
  }, [router.query.counter]);

  return <h1>{time}</h1>;
}
export default Page;
