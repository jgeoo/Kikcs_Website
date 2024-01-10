import { useNavigate } from 'react-router-dom';
import './Recommended.css';


function Recommended() {
  const navigate = useNavigate  ();
  const navigateFunction = (shoeBrand) => {
    
    navigate(`/main/${shoeBrand}`);
  };
  return (
    <>
      
        <div className="recommended-flex">
          <button className="button" onClick={() => navigateFunction('all')}> All Products</button>
          <button className="button" onClick={()=>navigateFunction('Jordan')}> Jordan</button>
          <button className="button"  onClick={()=>navigateFunction('Nike')}> Nike </button>   
          <button className="button"  onClick={()=>navigateFunction('Yeezy')}> Yeezy</button>
          
          
        </div>
    
    </>
  )
}
export default  Recommended;