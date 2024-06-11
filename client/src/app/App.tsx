import { Routes, Route, Navigate } from "react-router-dom";
import { FC, useEffect, useLayoutEffect, useState } from "react";
import { HomePage } from "../pages/HomePage/HomePage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { SignUpPage } from "../pages/SignUpPage/SignUpPage";
import { UniversitysPage } from "../pages/UniversitysPage/UniversitysPage";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";
import { AnnouncementPage } from "../pages/AnnouncementPage/AnnouncementPage";
import { ListOfAnnouncements } from "../pages/ListOfAnnouncements/ListOfAnnouncements";
import $api from "../http";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/user/user.slice";
import { RootState } from "../store";
import { Loader } from "../components/Loader/Loader";
import { FavoriteAnnouncementPage } from "../pages/FavoriteAnnouncementPage/FavoriteAnnouncementPage";

const App: FC = () => {
  const [loading, setLoading] = useState(true);
  const { isAuth } = useSelector((store: RootState) => store.user);
  const role = localStorage.getItem("role");
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const checkAuth = async () => {
      try {
        const role = localStorage.getItem("role");
        const response = await $api.post(
          `/refresh`,
          { role },
          {
            withCredentials: true,
          }
        );
        localStorage.setItem("token", response.data.accessToken);
        dispatch(setUser(response.data.user));
      } catch (e) {
        console.log(e);
      }
    };

    if (localStorage.getItem("token")) {
      checkAuth();
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      setLoading(true);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/universities"
            element={isAuth ? <UniversitysPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={isAuth ? <UniversitysPage /> : <LoginPage />}
          />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route
            path="/profile"
            element={isAuth ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/favoriteAnnouncement"
            element={
              isAuth && role === "Студент" ? (
                <FavoriteAnnouncementPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/announcements"
            element={
              isAuth && role === "Преподаватель" ? (
                <AnnouncementPage />
              ) : isAuth ? (
                <ListOfAnnouncements />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/universities/:universitiesId"
            element={
              isAuth ? <ListOfAnnouncements /> : <Navigate to="/login" />
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
