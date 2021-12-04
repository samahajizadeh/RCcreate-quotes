import { Fragment, useEffect} from "react";
import {
  Route,
  Routes,
  Link,
  useParams,
  Outlet,
  useLocation,
} from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import Loading from "../components/UI/Loadding";
import useHttp from "../hooks/use-http2";
import { getSingleQuote } from "../lib/api";

const QuoteDetail = () => {

  const params = useParams();
  const location = useLocation();
  const { pathname } = location;
  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);


   if (status === "pending") {
    return (
      <div className="loading">
        <Loading />
      </div>
    );
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (!loadedQuote.text) {
    return <p>No quote found!</p>;
  }

  return (
    <Fragment>
      <div>
        <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
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
  );
};

export default QuoteDetail;
