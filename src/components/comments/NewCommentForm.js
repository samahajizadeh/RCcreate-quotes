import React, { useEffect, useRef } from "react";
import classes from './NewCommentForm.module.css';
import useHttp from '../../hooks/use-http'

const NewCommentForm =(props) =>{
    const commentTextRef = useRef();
  

    const {isLoading,Status,sendRequest} =useHttp()
    const submitFormHandler =(event) =>{
        event.preventDefault();
        const comment=commentTextRef.current.value;
        const commentsValue = {text:comment}

        const transformData =(Data) =>{
          const generateId =Data.name;
          props.onAddComment({id:generateId,...commentsValue});
        }
        sendRequest({ url: "https://react-movies-d52dd-default-rtdb.firebaseio.com/comments.json",
        method: "POST",
        headers: { "Content-Type": "applicaton/json" },
        body: commentsValue},transformData)
        commentTextRef.current.value="";
    }

    const {onAddComment} = props;
    useEffect(()=>{
      if(Status === 'ok'){
        onAddComment();
      }
    },[Status,onAddComment])
    
  

   return(
    <form className={classes.form} onSubmit={submitFormHandler}>
    <div className={classes.control} onSubmit={submitFormHandler}>
      <label htmlFor='comment'>Your Comment</label>
      <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
    </div>
    <div className={classes.actions}>
      <button className='btn'>{isLoading ? "...Loading" :"Add Comment"}</button>
    </div>
  </form>
   )
}
export default NewCommentForm;