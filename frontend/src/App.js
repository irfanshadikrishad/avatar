import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Avatars from "./components/Avatars";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/avatars" element={<Avatars />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
