import './App.css';
import LoginForm from "./Components/LoginForm/LoginForm";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Components/Home/Home";
import SignupForm from "./Components/SignupForm/SignupForm";
import ConventionPage from "./Components/ConventionPage/ConventionPage";

function App() {
  return (
      <Router>


          <Routes>
              <Route path="/" element={
                  <>
                      <Home/>
                  </>
              }>
              </Route>
              <Route path="/ConventionPage/:conventionId" element={
                  <>
                      <ConventionPage/>
                  </>
              }>
              </Route>
              <Route path="/LoginForm" element={
                  <>
                      <LoginForm/>
                  </>
              }>
              </Route>
              <Route path="/SignupForm" element={
                  <>
                      <SignupForm/>
                  </>
              }>
              </Route>
          </Routes>
      </Router>
  );
}

export default App;
