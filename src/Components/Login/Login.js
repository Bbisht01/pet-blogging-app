import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom"
import axios from "axios";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoArrowRedoCircleOutline } from "react-icons/io5";
import { loggedInData } from "../../Redux/Action";
import { useTranslation } from "react-i18next";



export default function Login() {

  const dispatch = useDispatch()
  const {t} = useTranslation()
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false); 

  const [passwordHelperText, setPassworHelperText] = useState("");

  const navigate = useNavigate()

  const handleSubmit = () => {
    
    if (email.length === 0) {
      setEmailError(true);
      return;
    }
    if (password.length === 0) {
      setPasswordError(true);
      setPassworHelperText("password can't be blank");
      return;
    }
    
    // alert("we are good to go");

    axios
      .get(`http://localhost:5000/users?email=${email.toLowerCase()}&password=${password}`)
      .then((res) => {
        console.log(res);
       
        if(res.data.length>0){
          localStorage.setItem("loginSucced","success")
          
          dispatch(loggedInData(res.data))
          // navigate("/")
          // alert("login successful")
        } else {
          alert("login failed")
        }
        
      });
  }
  // const registeredData =  useSelector((state)=> state)
  // console.log(registeredData,"haha")
  return (
    <div style={{ width: "300px", margin: "auto", marginTop: "30px",border:"1px solid lightgray",paddingTop:"70px",paddingBottom:"80px",borderRadius:"20px"}}>
     
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onInput={() => setEmailError(false)}
        id="outlined-basic"
        type="email"
        label={t("Email")}
        variant="outlined"
        error={emailError}
        helperText={emailError ? "Email can't be blank" : ""}
      />
      <br />
      <br />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onInput={() => setPasswordError(false)}
        id="outlined-basic"
        label={t("Password")}
        type="password"
        variant="outlined"
        error={passwordError}
        helperText={passwordError ? passwordHelperText : ""}
      />     

      <br />
      <br />
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="success"
        style={{ width: "210px" }}
      >
        {t("Submit")}
      </Button>
    </div>
  );
}