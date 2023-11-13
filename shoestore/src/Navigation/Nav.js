import { FiHeart } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { LuUser } from 'react-icons/lu';
import './Nav.css';
import {auth} from "../config/firebase.js";
import { useNavigate } from 'react-router-dom';

 function Nav() {
  const user = auth.currentUser
  const navigate = useNavigate();
  const handleUser =  () =>{
      if(user)
      console.log(user)
      else
      navigate("/Login")
  }
  return <nav>
    <div>
      <h1 className="Logo" onClick={() => navigate("/main")}>Kicks</h1>
 
    </div>
    <div className="nav-container">
      <input 
      type = "text" 
      className="search-input"
      placeholder="Search your prefered shoes"
      />
    </div>

    <div className="profile-container">
    <button className="buttonNav"> Men</button>
    
    <button className="buttonNav"> Women</button>
        <span onClick={handleUser}>
        <LuUser className="nav-icons"/>
        </span>
        <span>
        <FiHeart  className="nav-icons"/>
        </span>
        <span>
        <AiOutlineShoppingCart className="nav-icons"/>
        </span>
   

    </div>
    </nav>
}

export default Nav;
