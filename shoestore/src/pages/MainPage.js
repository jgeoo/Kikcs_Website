import React from 'react'
import Recommended from '../Recommended/Recommended';
import  Navigation  from '../Navigation/Nav';
import RecommendedFY from '../RecommendeFY/ForYou';
import Products from '../Products/Products';
function MainPage() {
  return (
    <div>
        <Navigation/>
        <Recommended/>
        <RecommendedFY/>
        <Products/>
        
    </div>
  )
}
export default MainPage;