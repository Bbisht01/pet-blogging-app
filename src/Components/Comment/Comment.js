import React, { useState, useEffect, useRef, Fragment } from "react";
import "./Comment.css"
// import ToggleLike from "./ToggleLike";
import axios from 'axios';
import ToggleLike from "./ToggleLike";

const doRemoveWhiteSpace = str => str.replace(/\s{3,}/g, " ");
//Functional component - useFocus hook
const useFocus = () => {
  const htmlElRef = useRef(null),
    setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus();
    };

  return [htmlElRef, setFocus];
};

export const CommentComponent = ({id, commentArr}) => {
  const [inputRef, setInputFocus] = useFocus(),//Functional component - useFocus hook
    //creating states using useState
    [textValue, setTextValue] = useState("")

    //Comments to show in ui
    const [commentData, setCommentData] = useState([])
    //Change event of textarea
    const onChangeTextValue = () => {
      setTextValue(inputRef.current.value);
    },
    //Submit buttion click event
    onSubmit = () => {
      console.log(id,"commentId");
      var commentText = doRemoveWhiteSpace(inputRef.current.value);
      commentArr = commentArr==undefined ?  [commentText]:[...commentArr,commentText] 
      axios
        .patch(`http://localhost:5000/display_feeds/${id}`, {
            comment: commentArr,
        });
      // console.log(doRemoveWhiteSpace(inputRef.current.value));
      axios.get("http://localhost:5000/display_feeds")
      .then((res)=> setCommentData(res.data,"Comment"))
    }

  


  return (
    <>
    <div className="comment-div">
      <textarea
        placeholder={"Add a comment"}
        ref={inputRef}
        value={textValue}
        onChange={onChangeTextValue}
        className="comment-box"       
      />
      <br />
      <button onClick={()=>onSubmit()} className={"submit-btn"}>
        Comment
      </button>
      {/* <div>
       
      </div> */}
     
    </div>
    <div className="commentShowDiv">
      {
        commentData.map((comment)=>{
          return(
            <>
            <p style={{fontWeight:"bold",fontSize:"12px"}}>{comment.author}</p>
            <p>{comment.comment} <ToggleLike/></p>
         
            </>
          )
        })
      }

    </div>
    </>
  );
};
