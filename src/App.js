import './App.css';
import LoginForm from "./Components/LoginForm/LoginForm";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Components/Home/Home";
import SignupForm from "./Components/SignupForm/SignupForm";
import ConventionPage from "./Components/ConventionPage/ConventionPage";
import AuthProvider from "./provider/AuthProvider";
import AccountPage from "./Components/AccountPage/AccountPage";
import Schedule from "./Components/Schedule/Schedule";
import AddConventionPage from "./Components/AddConventionPage/AddConventionPage";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import EditConventionPage from "./Components/EditConventionPage/EditConventionPage";
import UserSearchPage from "./Components/UserSearchPage/UserSearchPage";
import {UserSearchProvider} from "./Components/TopNav/UserSearchContext";

function App() {
  return (
      <AuthProvider>
          <UserSearchProvider>
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
                      <Route path="/AddConventionPage" element={
                          <>
                              <AddConventionPage/>
                          </>
                      }>
                      </Route>
                      <Route path="/EditConventionPage/:conventionId" element={
                          <>
                              <EditConventionPage/>
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
                      <Route path="/AccountPage/:userIdAdmin?" element={
                          <>
                              <AccountPage/>
                          </>
                      }>
                      </Route>
                      <Route path="/ChangePassword" element={
                          <>
                              <ChangePassword/>
                          </>
                      }>
                      </Route>
                      <Route path="/UserSearchPage" element={
                          <>
                              <UserSearchPage/>
                          </>
                      }>
                      </Route>
                  </Routes>
              </Router>
          </UserSearchProvider>
      </AuthProvider>
  );
}

export default App;
