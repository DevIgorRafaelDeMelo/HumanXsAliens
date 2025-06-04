import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

import Home from "./Pages/Home";
import Map from "./Pages/Map";
import Torre from "./Pages/Torre";
import AuthScreen from "./Pages/AuthScreen";
import PrivateRoute from "./Components/PrivateRoute";
import Lobby from "./Pages/Lobby";
import Creat from "./Components/CharacterCard";
import Base from "./Pages/Base";

function App() {
  return (
    <UserProvider>
      {/* Envolve toda a aplicação */}
      <Routes>
        <Route path="/" element={<AuthScreen />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/map"
          element={
            <PrivateRoute>
              <Map />
            </PrivateRoute>
          }
        />
        <Route
          path="/torre"
          element={
            <PrivateRoute>
              <Torre />
            </PrivateRoute>
          }
        />
        <Route
          path="/lobby"
          element={
            <PrivateRoute>
              <Lobby />
            </PrivateRoute>
          }
        />
        <Route
          path="/creat"
          element={
            <PrivateRoute>
              <Creat />
            </PrivateRoute>
          }
        />
        <Route
          path="/base"
          element={
            <PrivateRoute>
              <Base />
            </PrivateRoute>
          }
        />
      </Routes>
    </UserProvider>
  );
}

export default App;
