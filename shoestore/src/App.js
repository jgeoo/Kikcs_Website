import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import MainPage from "./pages/MainPage";
import AdminPage from "./pages/AdminPage";


function App() {
  return (
     
  <div className="App">
    <Router>
      <Routes>
        <Route path = "*" element = {<MainPage/>}></Route>
        <Route path = "/Login" element = {<SignIn/>}></Route>
        <Route path = "/Register" element = {<SignUp/>}></Route>
        <Route path = "/Admin" element = {<AdminPage/>}></Route>
      </Routes>
      </Router>
    </div>
   
  );
} 

export default App;
