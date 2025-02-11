import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import FileList from "./components/FileList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/files" element={<FileList />} />
      </Routes>
    </Router>
  );
}

export default App;
