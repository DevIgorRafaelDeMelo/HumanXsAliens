import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./Pages/Home";
import Map from "./Pages/Map";
import { CharacterProvider } from "./context/useCharacter";
import Torre from "./Pages/Torre";

function App() {
  return (
    <UserProvider>
      <CharacterProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} /> 
          <Route path="/torre" element={<Torre />} />
        </Routes>
      </CharacterProvider>
    </UserProvider>
  );
}

export default App;
