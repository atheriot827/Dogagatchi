import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Quiz from './Quiz';
import ProtectedRoute from './ProtectedRoute';
import { Context } from './Context';
import '../app.css'; // imports css to apply to all components in App component
import LeaderBoard from './Leaderboard';
import Kennel from './Kennel';
import User from './User';
import NavBar from './Navbar';
import Restaurant from './Restaurant';
import About from './About';
import DeletedUser from './DeletedUser';
import Activity from './Activity';
import GetWellCenter from './GetWellCenter';
import Map from './Map';

function App() {
  return (
    <Context>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route
              path="/leaderBoard"
              element={(
                <div>
                  <NavBar />
                  <LeaderBoard />
                </div>
              )}
            />
            <Route
              path="/quiz"
              element={(
                <div>
                  <NavBar />
                  <Quiz />
                </div>
              )}
            />
            <Route
              path="/activity"
              element={(
                <div>
                  <NavBar />
                  <Activity />
                </div>
              )}
            />
            <Route
              path="/user"
              element={(
                <div>
                  <NavBar />
                  <User />
                </div>
              )}
            />
            <Route
              path="/kennel"
              element={(
                <div>
                  <NavBar />
                  <Kennel />
                </div>
              )}
            />
            <Route
              path="/restaurant"
              element={(
                <div>
                  <NavBar />
                  <Restaurant />
                </div>
              )}
            />
            <Route
              path="/getwellcenter"
              element={(
                <div>
                  <NavBar />
                  <GetWellCenter />
                </div>
              )}
            />
            <Route
              path="/about"
              element={(
                <div>
                  <NavBar />
                  <About />
                </div>
              )}
            />
            <Route
              path="/Map"
              element={(
                <div>
                  <NavBar />
                  <Map />
                </div>
              )}
            />
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="deleted" element={<DeletedUser />} />
        </Routes>
      </Router>
    </Context>
  );
}

export default App;
