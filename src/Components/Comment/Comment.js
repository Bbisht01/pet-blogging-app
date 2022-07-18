import React, { useState, useEffect, useRef, Fragment } from "react";
import "./Comment.css"
import ToggleLike from "./ToggleLike";
import axios from 'axios';

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
    [textValue, setTextValue] = useState(""),
    //Change event of textarea
    onChangeTextValue = () => {
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
    }


  return (
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
      <div>
        <ToggleLike/>
      </div>
     
    </div>
  );
};
