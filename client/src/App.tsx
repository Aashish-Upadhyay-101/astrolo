import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ActivateAccount from "./pages/ActivateAccount";
import AstroloHome from "./pages/AstroloHome";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="astrolo/" element={<AstroloHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/activate-account" element={<ActivateAccount />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
