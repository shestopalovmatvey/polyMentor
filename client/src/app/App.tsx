import { Routes, Route } from "react-router-dom";
import { FC } from "react";
import { HomePage } from "../pages/HomePage/HomePage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { SignUpPage } from "../pages/SignUpPage/SignUpPage";
import { UniversitysPage } from "../pages/UniversitysPage/UniversitysPage";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";
import { AnnouncementPage } from "../pages/AnnouncementPage/AnnouncementPage";
import { ListOfAnnouncements } from "../pages/ListOfAnnouncements/ListOfAnnouncements";
const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/universities" element={<UniversitysPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/announcements" element={<AnnouncementPage />} />
      <Route
        path="/ListOfAnnouncements/:universitiesId"
        element={<ListOfAnnouncements />}
      />
    </Routes>
  );
};

export default App;
