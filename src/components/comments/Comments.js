import React, { useCallback, useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import classes from "./Comments.module.css";
import CommentsList from "./CommentsList";
import NewCommentForm from "./NewCommentForm";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [comment, setComment] = useState("");
  const { isLoading, sendRequest } = useHttp();
  useEffect(() => {
    const getData = (data) => {
      let commentArray = [];
      for (let key in data) {
        commentArray.push({ id: key, text: data[key].text });
      }
      setComment(commentArray);
    };

    const timeOut = setTimeout(()=>{
      sendRequest(
        {
          url: "https://react-movies-d52dd-default-rtdb.firebaseio.com/comments.json",
        },
        getData
      );
    },0)
    
    return()=>{
      clearInterval(timeOut)
    }
  }, [sendRequest]);

  const addComment = useCallback((data) => {
    setComment((prevComment) => prevComment.concat(data));
  }, []);
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  let contentComment = <p>there is not message</p>;
  if (comment) {
    contentComment = <CommentsList comments={comment} />;
  }

  if (isLoading) {
    contentComment = <p>Loading....</p>;
  }
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}

      {isAddingComment && <NewCommentForm onAddComment={addComment} />}
      {contentComment}
    </section>
  );
};
export default Comments;
