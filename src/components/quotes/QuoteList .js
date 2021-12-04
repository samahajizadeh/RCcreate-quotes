import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuote = (qoute, isSorting) => {
  return qoute.sort((qouteA, qouteB) => {
    if(isSorting){
      return qouteA.id >qouteB.id ? 1: -1
    }else{
      return qouteA.id<qouteB.id ? 1 : -1
    }
  })
};

const QuoteList = (props) => {
  let navigate = useNavigate();
  let location = useLocation();
  let queryParams = new URLSearchParams(location.search);
  let isSortingAscending = queryParams.get("sort") === "asc";

  const sortHandling = () => {
    navigate(`/quotes/?sort=${isSortingAscending ? "desc" : "asc"}`);
  };

  const sortQoutes = sortQuote(props.quotes, isSortingAscending);

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button type="button" onClick={sortHandling}>{`Sort ${
          isSortingAscending ? "Descending" : "Ascending"
        }`}</button>
      </div>
      <ul className={classes.list}>
        {sortQoutes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
