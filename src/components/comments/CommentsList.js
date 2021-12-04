import React from "react";
import classes from './CommentsList.module.css';
import CommentItem from './CommentItem';

const CommentsList = (props) => {
  
    return (
      <ul className={classes.comments}>
        {props.comments.map((comment) => (
          <CommentItem key={comment.quoteId} text={comment.text} />
        ))}
      </ul>
    );
  };
  
  export default CommentsList;