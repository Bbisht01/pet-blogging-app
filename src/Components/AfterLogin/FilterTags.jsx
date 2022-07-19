import React, { useRef, useState, useEffect } from 'react'
import "./Blogs.css"
import { useDispatch,useSelector } from 'react-redux'
import { FilterTags } from '../../Redux/Action'
import { useTranslation } from 'react-i18next'
import axios from "axios"


export const FilterTag = ()=>{  
  
  const {t} = useTranslation()
  const [tags, setTagData] = useState([]);
  const [selectedTag, setSelectedTag] = useState(-1);
  const dispatch = useDispatch()
  const inputRef = useRef([])
  var count=0;
  function getData(){
    axios
      .get("http://localhost:5000/display_feeds")
      .then((res) => {
        var temp = tags;
        res.data.map((el, i) =>{
          temp.push(...el.tag)
        })
        var obj = {}
        for(var x of temp)
          obj[x] = 1;
        console.log(obj);
        var arr = Object.keys(obj)
        setTagData(arr);
      });
  }
  useEffect(() => {
    count=0
    getData()
  }, []);
  

  function handleTag(tag){
    dispatch(FilterTags(tag))
    
  }
  // e.target.style.background="red"

    return(        
        <>
        <div className="recommended_topics">
           <p>{t("SearchTopics")}</p>
           <div className="various_tags">
            {
            tags.map((el, i)=>
              <p style={{backgroundColor:selectedTag==i? "black":"white", color:selectedTag==i? "white":"black" }} onClick={(e)=>{
                if(i==selectedTag)
                {
                  setSelectedTag(-1)
                  handleTag("");
                } 
                else
                {
                  setSelectedTag(i);
                  handleTag(el)
                }
                
                
              }
              } className="makeActive1">{el}</p>
            )}
             

           </div>
           
        </div>
        <hr className="hr_after_divs2"/>
     
 </>
    )
}