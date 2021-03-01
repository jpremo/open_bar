import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import UserProfile from "./components/UserProfile";
import UserList from "./components/UserList";
import Bar from "./components/Bar/Bar"

import SearchResults from "./components/SearchResults/SearchResults"
import Home from "./components/Home/Home";
import CreateBar from "./components/UserProfile/CreateBar"
import { restoreUser } from "./store/session";
import { useDispatch } from "react-redux";


function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    (async() => {
      const user = await dispatch(restoreUser())
      if(user) setAuthenticated(true);
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar setAuthenticated={setAuthenticated} />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
         </Route>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <Route path="/bars/create" exact={true}>
          <CreateBar />
        </Route>
        <Route path="/bars/:barId" exact={true}>
          <Bar />
        </Route>
        <Route path="/search" exact={true}>
          <SearchResults authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <UserProfile />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <h1>My Home Page</h1>
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
