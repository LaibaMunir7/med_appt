import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Sign_Up from "./Components/Sign_Up/Sign_Up";
import Login from "./Components/Login/Login";
import Landing_Page from "./Components/Landing_Page/Landing_Page";
import BookingConsultation from "./Components/BookingConsultation";
import Notification from "./Components/Notification/Notification";
import GiveReviews from "./Components/GiveReviews/GiveReviews";
import ProfileCard from "./Components/ProfileCard/ProfileCard";
import ReportsLayout from "./Components/ReportsLayout/ReportsLayout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Notification>
          <Routes>
            <Route path="/" element={<Landing_Page />} />

            <Route path="/signup" element={<Sign_Up />} />

            <Route path="/login" element={<Login />} />

            <Route
              path="/search/doctors"
              element={<BookingConsultation />}
            />

            <Route
              path="/reviews"
              element={<GiveReviews />}
            />

            <Route
              path="/profile"
              element={<ProfileCard />}
            />

            <Route
              path="/reports"
              element={<ReportsLayout />}
            />
          </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

export default App;