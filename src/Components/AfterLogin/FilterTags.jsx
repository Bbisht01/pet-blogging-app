import React, { useRef } from 'react'
import "./Blogs.css"
import { useDispatch,useSelector } from 'react-redux'
import { FilterTags } from '../../Redux/Action'
import { useTranslation } from 'react-i18next'

export const FilterTag = ()=>{  
  
  const {t} = useTranslation()

  const dispatch = useDispatch()
  const inputRef = useRef(null)
  
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/display_feeds")
  //     .then((res) => setTagData(res.data));
  // }, []);
  
  function handleTag(tag){
    console.log(inputRef)
    dispatch(FilterTags(tag))
    // console.log(tag)
   
      //  inputRef.current.style.backgroundColor="red"
    //   inputRef.current.style.color="white"
    // }
  }
  // e.target.style.background="red"

    return(        
        <>
        <div className="recommended_topics">
           <p>{t("SearchTopics")}</p>
           <div className="various_tags">
              <div>
                <p onClick={(e)=>handleTag("Dogs")} ref = {inputRef} className="makeActive1">{t("Dogs")}</p>
                <p onClick={(e)=>                  
                  handleTag("Cats")}  ref = {inputRef}  className="makeActive2">{t("Cats")}</p>
                <p onClick={()=>handleTag("Cat Food")}  ref = {inputRef} className="makeActive3">{t("CatFood")}</p>
              </div>
              <div>
                <p onClick={()=>handleTag("Rabbit")} >{t("Rabbit")}</p>
                <p onClick={()=>handleTag("Heatstroke")}>{t("Heatstroke")}</p>
                <p onClick={()=>handleTag("Nature")}>{t("Nature")}</p>
              </div>
              <div>
                <p onClick={()=>handleTag("tortise-care")}>{t("Tortisecare")}</p>
                <p onClick={()=>handleTag("Parrots")}>{t("Parrots")}</p>
                <p onClick={()=>handleTag("Birds")}>{t("Birds")}</p>
              </div>
              <div>
                <p onClick={()=>handleTag("northernparrots")}>{t("northernparrots")}</p>
                <p onClick={()=>handleTag("Horse")}>{t("Horse")}</p>
               
              </div>
              <div>
              <p onClick={()=>handleTag("Wild Birds")}>{t("WildBirds")}</p>
                <p onClick={()=>handleTag("Fish")}>{t("Fish")}</p>
                <p onClick={()=>handleTag("Gold Fish")}>{t("GoldFishs")}</p>
              </div>
              

           </div>
           
        </div>
        <hr className="hr_after_divs2"/>
     
 </>
    )
}