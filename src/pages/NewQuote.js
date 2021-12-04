import { useEffect } from "react";
import { useNavigate } from "react-router";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";

const NewQuote = () => {
  let navigate = useNavigate();
  const { isLoading,Status, sendRequest } = useHttp();


  const newQouteHandler = (quoteData) => {
    const transformData = (data) => {
    
      const generate = data.name;
    
      const creatData = { id: generate, ...quoteData };
      console.log(creatData)
    }
  
    sendRequest(
      {
        url: "https://react-movies-d52dd-default-rtdb.firebaseio.com/quotes.json",
        method: "POST",
        headers: { "Content-Type": "applicaton/json" },
        body: quoteData,
      },
      transformData
    );
   
  };
  useEffect(()=>{
    if(Status === "OK"){
      navigate("/quotes")
    }
  },[Status,navigate])
  return <QuoteForm onAddQuote={newQouteHandler} isLoading={isLoading} />;
};

export default NewQuote;
