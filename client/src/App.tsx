import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import ActivateAccount from "./pages/ActivateAccount";
import AstroloHome from "./pages/AstroloHome";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Signup from "./pages/Signup";
import AstrolgoerProfileDetail from "./pages/AstrolgoerProfileDetail";
import Appointments from "./pages/Appointments";
import { Elements } from "@stripe/react-stripe-js";

const stripe_key = process.env.REACT_APP_STRIPE_KEY || "";
const stripePromise = loadStripe(stripe_key);

const App: React.FC = () => {
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
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
            <Route
              path="/astrologer/:username/book-an-appointment"
              element={<Appointments />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </Elements>
    </div>
  );
};

export default App;
