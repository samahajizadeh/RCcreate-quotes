import { Fragment, useEffect, useState } from "react";
import {
  Route,
  Routes,
  Link,
  useParams,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import Loading from "../components/UI/Loadding";
import useHttp from "../hooks/use-http";


const QuoteDetail = () => {
  
  const [quotes, setQuotes] = useState([]);

  const params = useParams();
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate()

  const { isError, isLoading, sendRequest } = useHttp();

  useEffect(() => {
    const getData = (data) => {
      const quoteArray = [];
      for (let key in data) {
        quoteArray.push({ id: key, ...data[key] });
      }

      setQuotes(quoteArray);
    };
    sendRequest(
      {
        url: "https://react-movies-d52dd-default-rtdb.firebaseio.com/quotes.json",
      },
      getData
    );
  }, [sendRequest]);


  let contentDetail = <p>NotFound</p>;
 
  if (quotes.length>0) {
    let quote = [];
    quote = quotes.findIndex((quote) => quote.id === params.quoteId);
    if(quote> -1){
      quote =quotes[quote]
    }else{
      navigate('/404')
    }
    contentDetail =<Fragment>
      <div>
        <HighlightedQuote text={quote.text} author={quote.author} />       
        <Routes>
          <Route
            index
            element={
              <div className="centered">
                <Link className="btn--flat" to={`${pathname}/comments`}>
                  Load Comment
                </Link>
              </div>
            }
          ></Route>
        </Routes>
        <Outlet />
      </div>
    </Fragment>
  }

  if(isLoading){
    contentDetail =<div className="loading">
          <Loading />
        </div>
  }
  if(isError){
    contentDetail = <p>{isError}</p>
  }


  return contentDetail;
};

export default QuoteDetail;
