import React, { useEffect, useRef } from "react";
import classes from "./NewCommentForm.module.css";
import useHttp from "../../hooks/use-http2";
import { addComment } from "../../lib/api";
import { useParams } from "react-router";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const params = useParams();
  const { quoteId } = params;
  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddComment } = props;
  useEffect(() => {

    if (status === "completed" && !error) {
      onAddComment();
    }
  }, [status, onAddComment, error]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    const comment = commentTextRef.current.value;
    const commentsValue = { quoteId: quoteId, commentData:{text :comment} };

    sendRequest(commentsValue);
    commentTextRef.current.value = "";
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">
          {status === "pending" ? "...Loading" : "Add Comment"}
        </button>
      </div>
    </form>
  );
};
export default NewCommentForm;
