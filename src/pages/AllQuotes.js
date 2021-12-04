import { useEffect} from "react";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import QuoteList from "../components/quotes/QuoteList ";
import Loading from "../components/UI/Loadding";
import useHttp from "../hooks/use-http2";
import {getAllQuotes} from '../lib/api';


const AllQuotes = () => {
  const {sendRequest,status,error,data:loadedQuotes} = useHttp(getAllQuotes,true)
  useEffect(()=>{
    sendRequest()
  },[sendRequest]);
  
 
  if (status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)){
    return <NoQuotesFound/>
  }

 
  if (status === 'pending') {
    return(
      <div className="loading">
        <Loading />
      </div>
    );
  }
  if (error) {
    return <p className="centered">{error}</p>;
  }
  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;
