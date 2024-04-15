import './App.css';
import LoginForm from "./Components/LoginForm/LoginForm";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Components/Home/Home";
import SignupForm from "./Components/SignupForm/SignupForm";
import ConventionPage from "./Components/ConventionPage/ConventionPage";
import AuthProvider from "./provider/AuthProvider";
import Account from "./Components/Account/Account";
import Schedule from "./Components/Schedule/Schedule";

function App() {
  return (

      <AuthProvider>
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
                  <Route path="/Schedule/:scheduleId" element={
                      <>
                          <Schedule/>
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
                  <Route path="/Account" element={
                      <>
                          <Account/>
                      </>
                  }>
                  </Route>
              </Routes>
          </Router>
      </AuthProvider>
  );
}

export default App;
