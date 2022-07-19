import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FilterTags, homePageData, IndividualPage } from "../../Redux/Action";
// import Likes from '../../Redux/Likes'
import "./Blogs.css";
import { FilterTag } from "./FilterTags";
import { IoSearchOutline } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";

export default function Blogs() 
{
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [likeButton,setLikeButton] = useState(false);
  const [flag,setFlag] = useState(false);

  

  useEffect(() => {
    axios
      .get("http://localhost:5000/display_feeds")
      .then((res) => 
      { 
        lstorage(res.data);       
        dispatch(homePageData(res.data));
      });      
  }, []);

  const lstorage = (p) =>
  {   
      var lstoragedata = JSON.parse(localStorage.getItem("dataForlikebutton") || "[]");        
      lstoragedata = null;
      localStorage.setItem("dataForlikebutton",JSON.stringify(lstoragedata));
      lstoragedata = p;
      localStorage.setItem("dataForlikebutton",JSON.stringify(lstoragedata));
  }

  const dataForHomePage = useSelector((state) => state.homeData);


  const getTag = useSelector((state) => state.filterTag);


  const FilteredTag = dataForHomePage.filter((e) => e.tag == getTag);


  function IndividualClick(e) 
  {
    
    const action = IndividualPage(e.id);

    dispatch(action);
    navigate("/showFeed");
  }

  const searchDataFromInput = (e) => {
    dispatch(FilterTags(e));
  };

  const handleLikeButton = (e) => 
  {    
    let lstoragedata = JSON.parse(localStorage.getItem("dataForlikebutton"));      
    lstoragedata.forEach((ele) => 
    {
        if(ele.id === e.id)                
        {
          ele.likes++
        }
    })  
    localStorage.setItem("dataForlikebutton",JSON.stringify(lstoragedata));
    setLikeButton(true);
    setFlag(!flag);
  };



  var lstoragedata = JSON.parse(localStorage.getItem("dataForlikebutton"));      

  

  return getTag == "" ? (
    <div className="homePageDiv">
      <div className="LeftBar">
        <div className="SearchInputDiv">
          <IoSearchOutline className="searchIcon" />
          <input
            type="search"
            placeholder="Search"
            onChange={(event) => searchDataFromInput(event.target.value)}
            aria-label="Search"
          />
        </div>
        <FilterTag />
      </div>
      {!likeButton ? 
        <div>
          {dataForHomePage.map((e) => {
            return (
              <div className="feed_after_login" key={e.id}>
                <div className="feed_left">
                  <div className="feed_top">
                    <img src={e.profile_url} />
                    <p>
                      {e.author}
                      <span className="feed_top_span"></span>
                      {e.source.name ? " in " + e.source.name : ""}
                    </p>
                    <p id="date_after_login">{e.date}</p>
                  </div>
                  <div
                    className="feed_middle"
                    onClick={() => IndividualClick(e)}
                    style={{ textAlign: "left" }}
                  >
                    <h2>{e.title}</h2>
                    <p>{e.description}</p>
                  </div>
                  <div className="feed_bottom">
                    <div className="time">
                      <p>{e.reading_time} </p>
                      <p className="theTag">{e.tag}</p>
                     
                    </div>
                    <div className="LikeButton">
                      <button onClick={() => handleLikeButton(e)}>
                        <IoHeartOutline />
                        {e.likes}
                      </button>
                      {/* <Likes /> */}
                    </div>
                  </div>
                  {/* <hr id="hr_line_1"></hr> */}
                </div>
                <div className="feed_right">
                  <img src={e.urlToImage} />
                  {/* <hr id="hr_line_2"></hr> */}
                </div>
              </div>
            );
          })}
        </div>
      :
          <div>
          {lstoragedata.map((e) => {
            return (
              <div className="feed_after_login" key={e.id}>
                <div className="feed_left">
                  <div className="feed_top">
                    <img src={e.profile_url} />
                    <p>
                      {e.author}
                      <span className="feed_top_span"></span>
                      {e.source.name ? " in " + e.source.name : ""}
                    </p>
                    <p id="date_after_login">{e.date}</p>
                  </div>
                  <div
                    className="feed_middle"
                    onClick={() => IndividualClick(e)}
                    style={{ textAlign: "left" }}
                  >
                    <h2>{e.title}</h2>
                    <p>{e.description}</p>
                  </div>
                  <div className="feed_bottom">
                    <div className="time">
                      <p>{e.reading_time} </p>
                      <p className="theTag">{e.tag}</p>
                      
                    </div>
                    <div className="LikeButton">
                      <button onClick={() => handleLikeButton(e)}>
                        <IoHeartOutline />
                        {e.likes}
                      </button>
                      {/* <Likes /> */}
                    </div>
                  </div>
                  
                </div>
                <div className="feed_right">
                  <img src={e.urlToImage} />
                  
                </div>
              </div>
            );
          })}
        </div>
      }
      
    </div>
  ) : (
    <div className="homePageDiv">
      <div className="LeftBar">
        <div className="SearchInputDiv">
          <IoSearchOutline className="searchIcon" />
          <input
            type="search"
            placeholder="Search"
            onChange={(event) => searchDataFromInput(event.target.value)}
            aria-label="Search"
          />
        </div>
        <FilterTag />
      </div>
      <div>
        {FilteredTag.map((e) => {
          return (
            <div className="feed_after_login" key={e.id}>
              <div className="feed_left">
                <div className="feed_top">
                  <img src={e.profile_url} />
                  <p>
                    {e.author}
                    <span className="feed_top_span"></span>
                    {e.source.name ? " in " + e.source.name : ""}
                  </p>
                  <p id="date_after_login">{e.date}</p>
                </div>
                <div
                  className="feed_middle"
                  onClick={() => IndividualClick(e)}
                  style={{ textAlign: "left" }}
                >
                  <h2>{e.title}</h2>
                  <p>{e.description}</p>
                </div>
                <div className="feed_bottom">
                  <div className="time">
                    <p>{e.reading_time} </p>
                    <p className="theTag">{e.tag}</p>
                  </div>
                  <div className="LikeButton">
                    <button onClick={() => handleLikeButton(e)}>
                      <IoHeartOutline />
                      {e.likes}
                    </button>
                    {/* <Likes/> */}
                  </div>
                </div>
               
              </div>
              <div className="feed_right">
                <img src={e.urlToImage} />
            
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
