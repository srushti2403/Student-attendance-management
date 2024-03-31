import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginForm";
import SignUpTeacher from "./pages/SignUpTeacher";
import SignUpStudent from "./pages/SignUpStudent";
import StudentDashBoard from "./pages/StudentDashBoard";
import TeacherDashBoard from "./pages/TeacherDashBoard";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signUpTeacher" element={<SignUpTeacher />} />
          <Route path="/signUpStudent" element={<SignUpStudent />} />
          <Route path="/studentDashboard" element={<StudentDashBoard />} />
          <Route path="/teacherDashboard" element={<TeacherDashBoard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
