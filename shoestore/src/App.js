import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import MainPage from "./pages/MainPage";
import AdminPage from "./pages/AdminPage";
import ProductsWrapper from './components/Products/ProductsWrapper';
import UserCredentials from './components/UserCredentials';


function App() {
  return (
     
  <div className="App">
    <Router>
      <Routes>
        <Route path = "/*" element = {<MainPage/>}></Route>
        <Route path = "/Login" element = {<SignIn/>}></Route>
        <Route path = "/UserCredentials" element = {<UserCredentials/>}></Route>
        <Route path = "/Register" element = {<SignUp/>}></Route>
        <Route path = "/Admin" element = {<AdminPage/>}></Route>
        <Route path = "/main/:brand" element = {<ProductsWrapper/>}></Route>
      </Routes>
      </Router>
    </div>
   
  );
} 

export default App;
