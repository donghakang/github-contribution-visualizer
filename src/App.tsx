import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ContributionView, StartView } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartView />} />
        <Route path="/contribution" element={<ContributionView />} />
      </Routes>
    </Router>
  );
}

export default App;
