import { Routes, Route } from "react-router-dom";
import { FC } from "react";
import { HomePage } from "../pages/HomePage/HomePage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { SignUpPage } from "../pages/SignUpPage/SignUpPage";
const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
    </Routes>
  );
};

export default App;
