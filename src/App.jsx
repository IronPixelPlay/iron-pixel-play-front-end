import { useContext, useState } from "react";
import "./App.css";
import GameDetailsPage from "./pages/GameDetails";
import GameListPage from "./pages/GameListPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SingupPage";
import UserProfilePage from "./pages/UserProfilePage";
import NavbarComponent from "./components/Navbar";
import CreateGame from "./pages/CreateGame";
import { Route, Routes } from "react-router-dom";
import IsPrivate from "./components/IsPrivate";
import EditGame from "./pages/EditGame";
import SortGames from "./pages/SortGames";

function App() {
  const [ userInfo, setUserInfo ] = useState(null);
  return (
    <div>
      <NavbarComponent userInfo={userInfo}/>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GameListPage />} />
        <Route path="/games/:gameId" element={<GameDetailsPage />} />
        <Route path="/games/:gameId/edit" element={<EditGame />} />
        <Route path="/games/create" element={<IsPrivate><CreateGame /></IsPrivate>}/>
        <Route path="/games/sort/:category" element={<SortGames />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user" element={<ProfilePage updateUser={setUserInfo} />}/>
        <Route path="/user/:userId" element={<UserProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
