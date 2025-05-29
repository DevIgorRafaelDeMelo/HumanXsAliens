import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./Pages/Home";
import Map from "./Pages/Map";
import { CharacterProvider } from "./context/useCharacter";

function App() {
  return (
    <UserProvider>
      <CharacterProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </CharacterProvider>
    </UserProvider>
  );
}

export default App;
