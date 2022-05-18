import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./Components/Chat/Chat";
import Join from "./Components/Join/Join";


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Join />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
