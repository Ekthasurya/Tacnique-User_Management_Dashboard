import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./component/AddUser";
import UserManagement from "./component/UserManagement";
import EditUser from "./component/EditUser";


const App = () => (
  <>
    <Router>
      <Routes>
        <Route path="/" element={<UserManagement />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:userId" element={<EditUser />} />
      </Routes>
    </Router>
  </>
);

export default App;
