import React, { useState, useCallback, useEffect } from "react";
import useHttp from "../../hooks/use-http2";
import classes from "./Comments.module.css";
import CommentsList from "./CommentsList";
import NewCommentForm from "./NewCommentForm";
import { getAllComments } from "../../lib/api";
import { useParams } from "react-router";
import Loading from "../UI/Loadding";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const { sendRequest, status, data: loadedComment } = useHttp(getAllComments);

  const params = useParams();
  const { quoteId } = params;

  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  let contentComment;

  if (status === "completed" && loadedComment && loadedComment.length > 0) {
    contentComment = <CommentsList comments={loadedComment} />;
  }

  if (
    status === "completed" &&
    (!loadedComment || loadedComment.length === 0)
  ) {
    contentComment = <p className="centered">No comments were added yet!</p>;
  }

  if (status === "pending") {
    contentComment = (
      <div className="centered">
        <Loading />
      </div>
    );
  }
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}

      {isAddingComment && <NewCommentForm onAddComment={addedCommentHandler} />}
      {contentComment}
    </section>
  );
};
export default Comments;
