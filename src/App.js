import './App.css';
import LoginForm from "./Components/LoginForm/LoginForm";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Home from "./Components/Home/Home";
import SignupForm from "./Components/SignupForm/SignupForm";
import ConventionPage from "./Components/ConventionPage/ConventionPage";
import AuthProvider, {useAuth} from "./provider/AuthProvider";
import AccountPage from "./Components/AccountPage/AccountPage";
import Schedule from "./Components/Schedule/Schedule";
import AddConventionPage from "./Components/AddConventionPage/AddConventionPage";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import EditConventionPage from "./Components/EditConventionPage/EditConventionPage";
import UserSearchPage from "./Components/UserSearchPage/UserSearchPage";
import {UserSearchProvider} from "./Components/TopNav/UserSearchContext";
import {SearchPaginationProvider} from "./Components/TopNav/SearchPaginationContext";
import PasswordResetPage from "./Components/PasswordResetPage/PasswordResetPage";

function App() {
  return (
      <AuthProvider>
          <SearchPaginationProvider>
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
                              <PrivateRoute component={<AddConventionPage/>}/>
                          }>
                          </Route>
                          <Route path="/EditConventionPage/:conventionId" element={
                              <PrivateRoute component={<EditConventionPage/>}/>
                          }>
                          </Route>
                          <Route path="/LoginForm" element={
                              <>
                                  <LoginForm/>
                              </>
                          }>
                          </Route>
                          <Route path="/PasswordReset" element={
                              <>
                                  <PasswordResetPage/>
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
                              <PrivateRoute component={<AccountPage/>
                              }/>
                          }>
                          </Route>
                          <Route path="/ChangePassword" element={
                              <PrivateRoute component={<ChangePassword/>}/>
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
          </SearchPaginationProvider>
      </AuthProvider>
  );
}

function PrivateRoute({ component }) {
    const { isAuth } = useAuth();

    return isAuth() ? component : <Navigate to="/LoginForm"/>;
}

export default App;
