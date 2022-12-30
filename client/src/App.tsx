import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ActivateAccount from "./pages/ActivateAccount";
import AstroloHome from "./pages/AstroloHome";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Signup from "./pages/Signup";
import AstrolgoerProfileDetail from "./pages/AstrolgoerProfileDetail";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/astrolo" element={<AstroloHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/auth/activate-link/:username"
            element={<ActivateAccount />}
          />
          <Route
            path="/astrologer/:username"
            element={<AstrolgoerProfileDetail />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
