import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { Component } from "react";
import Layout from "./components/layout/Layout";
import AllQoutes from "./pages/AllQuotes";

import NotFound from "./pages/NotFound";
import NewQuote from "./pages/NewQuote";
import QuoteDetail from "./pages/QuoteDetail";
import Comments from "./components/comments/Comments";

class App extends Component {
  render() {
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate replace to="/quotes" />} />
          <Route path="quotes" element={<AllQoutes />} />
          <Route path="quotes">
            <Route path=":quoteId" element={<QuoteDetail />}>
              <Route path="comments" element={<Comments />} />
            </Route>
          </Route>

          {/* <Route path="quotes">
            <Route path=":quoteId" element={<QuoteDetail />}>
              <Route
                path="comments"
                element={<Comments />}
              />
            </Route>
          </Route> */}

          <Route path="/new-quote" element={<NewQuote />} />

          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Layout>
    );
  }
}
export default App;
