import React from 'react'
import Products from '../Products/Products';
function MainPage() {
  return (
    <div>
        <Products main={true} brand="all"/> 
    </div>
  )
}
export default MainPage;