import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import MainPage from "./pages/MainPage";
import AdminPage from "./pages/AdminPage";
import Products from './Products/Products';
import ProductsWrapper from './Products/ProductsWrapper';


function App() {
  return (
     
  <div className="App">
    <Router>
      <Routes>
        <Route path = "/main" element = {<MainPage/>}></Route>
        <Route path = "/Login" element = {<SignIn/>}></Route>
        <Route path = "/Register" element = {<SignUp/>}></Route>
        <Route path = "/Admin" element = {<AdminPage/>}></Route>
        <Route path = "/main/:brand" element = {<ProductsWrapper/>}></Route>
      </Routes>
      </Router>
    </div>
   
  );
} 

export default App;
