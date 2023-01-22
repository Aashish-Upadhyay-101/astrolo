import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import ActivateAccount from "./pages/ActivateAccount/ActivateAccount";
import AstroloHome from "./pages/AstroloHome/AstroloHome";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound";
import Signup from "./pages/Signup/Signup";
import AstrolgoerProfileDetail from "./pages/AstrologerProfileDetail/AstrologerProfileDetail";
import Appointments from "./pages/Appointments/Appointments";
import { Elements } from "@stripe/react-stripe-js";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import Dashboard from "./pages/Dashboard/Dashboard";
import ChatBox from "./pages/ChatBox/ChatBox";

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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/dashboard/chats/:conversationName"
              element={<ChatBox />}
            />
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
            <Route
              path="/astrologer/checkout/success"
              element={<PaymentSuccess />}
            />
            <Route
              path="/astrologer/checkout/cancel"
              element={<PaymentCancel />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </Elements>
    </div>
  );
};

export default App;
