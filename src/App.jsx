import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Sign_Up from "./Components/Sign_Up/Sign_Up";
import Login from "./Components/Login/Login";
import Landing_Page from "./Components/Landing_Page/Landing_Page";
import BookingConsultation from "./Components/BookingConsultation";
import Notification from "./Components/Notification/Notification";

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
          </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

export default App;