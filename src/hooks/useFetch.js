import { useEffect, useState } from "react";

const useFetch = (endPoint, method, headers, body) => {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endPoint, { method, headers, credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then(({ data }) => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch((err) => {
        // auto catches network / connection error
        setIsPending(false);
        setError(err.message);
      });
  }, [endPoint]);
  return { data, isPending, error };
};

export default useFetch;
