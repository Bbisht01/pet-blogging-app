
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes } from 'react-router-dom';
import Blogs from './Components/AfterLogin/Blogs';
import Collection from './Components/Collection/Collection';
import  {ShowFeed} from './Components/DetailsPage/FeedDetails';
import Navbar from "./Components/Navbar/Navbar";
import Register from './Components/Register/Register';
import  Login  from './Components/Login/Login';
import WriteBlogs from './Components/Write/WriteBlog';



function App() {
 
  return (
    <div className="App">    
      
     <Navbar/>

     <Routes>
     <Route  path="/" element = {<Blogs/>}></Route>
     <Route  path="/showFeed" element = {<ShowFeed/>}></Route>
     <Route  path="/write" element = {<WriteBlogs/>}></Route>
     <Route  path="/login" element = {<Login/>}></Route>
     <Route  path="/register" element = {<Register/>}></Route>
     <Route  path="/collection" element = {<Collection/>}></Route>    

     </Routes>
     
  
     
    </div>
  );
}

export default App;
