import { useEffect } from "react";
import { useNavigate } from "react-router";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http2";
import { addQuote } from "../lib/api";

const NewQuote = () => {
  let navigate = useNavigate();
  const {sendRequest,status}=useHttp(addQuote)


  const newQouteHandler =  (quoteData) => {
    sendRequest(quoteData);
   
  };
  useEffect(()=>{
    if(status === "completed"){
      navigate("/quotes")
    }
    return ()=>{
      console.log('CleanUp')
    }
  },[status,navigate])
  return <QuoteForm onAddQuote={newQouteHandler} isLoading={status === 'pending'} />;
};

export default NewQuote;
