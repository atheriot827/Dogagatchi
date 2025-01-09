import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './Context';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Home from './Home';
import Quiz from './Quiz';
import '../app.css'; // imports css to apply to all components in App component
import LeaderBoard from './Leaderboard';
import Kennel from './Kennel';
import User from './User';
import NavBar from './Navbar';
import Restaurant from './Restaurant';
import About from './About';
import DeletedUser from './DeletedUser';
import GetWellCenter from './GetWellCenter';
import PoochCenter from './PoochCenter';
import DogShop from './DogShop';
import Map from './Map';

function App() {
  const [dogs, setDogs] = useState([]);
  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user._id) {
      // Fetch user's dogs
      axios.get(`/dog/users/${user._id}`)
        .then(response => {
          setDogs(response.data.dogsArr);
          // Fetch user's coins
          return axios.get(`/user/${user._id}`);
        })
        .then(userData => {
          setCoins(userData.data[0].coinCount);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching user data:', err);
          setLoading(false);
        });
    }
  }, [user]);

  if (!user && window.location.pathname !== '/') {
    return <Navigate to="/" />;
  }

  return (
      <div>
       {user && <NavBar coins={coins} />}
       {loading && user ? (
          <div>Loading...</div>
        ) : (
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/deleted" element={<DeletedUser />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/leaderBoard" element={<LeaderBoard />} />
            <Route
              path="/kennel"
              element={
                <Kennel
                  dogs={dogs.filter(dog => dog.owner === user._id)}
                  setDogs={setDogs}
                  coins={coins}
                  setCoins={setCoins}
                />
              }
            />
            <Route
              path="/shop"
              element={
                <DogShop
                  coins={coins}
                  setCoins={setCoins}
                  setDogs={setDogs}
                />
              }
            />
            <Route path="/pooch-center" element={<PoochCenter />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/user" element={<User />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/getwellcenter" element={<GetWellCenter />} />
            <Route path="/about" element={<About />} />
            <Route path="/map" element={<Map />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
