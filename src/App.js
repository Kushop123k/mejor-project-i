import './App.css';
import NavBar from './component/NavBar'
import Register  from './component/Register';
import Home from './component/Home';
import ViewUser from './component/ViewUser';
import{BrowserRouter,Routes,Route}from 'react-router-dom'
import SignIn from './component/Sing-in';
function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
      <Route path="Home" element={<Home/>}/>
      <Route path="add" element={<Register/>}/>
      <Route path="view" element={<ViewUser/>}/>
      <Route path="Sing" element={<SignIn/>}/>
     
      </Routes>
    </BrowserRouter>
  );
}

export default App;
