import './App.css';
import LoginForm from "./Components/LoginForm/LoginForm";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Components/Home/Home";

function App() {
  return (
      <Router>


          <Routes>
              <Route path="/" element={
                  <>
                      <LoginForm/>
                  </>
              }>
              </Route>
              <Route path="/Home" element={
                  <>
                      <Home/>
                  </>
              }>
              </Route>
          </Routes>
      </Router>
  );
}

export default App;
