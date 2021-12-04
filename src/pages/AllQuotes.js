import { useEffect, useState } from "react";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import QuoteList from "../components/quotes/QuoteList ";
import Loading from "../components/UI/Loadding";
import useHttp from "../hooks/use-http";


const AllQuotes = (props) => {
  const [quotes, setQuotes] = useState("");
  const { isLoading, isError, sendRequest } = useHttp();
  useEffect(() => {
    const getData = (data) => {
      const quoteArray = [];
      for (let key in data) {
        quoteArray.push({ id: key, ...data[key] });
      }
      setQuotes(quoteArray);
    };

    sendRequest({ url: "https://react-movies-d52dd-default-rtdb.firebaseio.com/quotes.json"}, getData);
  }, [sendRequest]);

  
  let content = <NoQuotesFound />;

  if (quotes.length>0) {
    content = <QuoteList quotes={quotes} />;
  }
  if (isLoading) {
    content = (
      <div className="loading">
        <Loading />
      </div>
    );
  }
  if (isError) {
    content = <p className="centered">{isError}</p>;
  }
  return <div>{content}</div>;
};

export default AllQuotes;
