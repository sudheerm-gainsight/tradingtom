import { Routes, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Courses from "../pages/Courses";
import CourseDetail from "../pages/CourseDetail";
import Payment from "../pages/Payment";
import News from "../pages/News";
import Forum from "../pages/Forum";
import WidgetPuzzle from "../pages/WidgetPuzzle";

import Dashboard from "../admin/Dashboard";
import AdminCoursesList from "../admin/AdminCoursesList";

function AppRoutes() {
  const { isAdmin } = useAuth();

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/news" element={<News />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/widget-puzzle" element={<WidgetPuzzle />} />
      </Route>

      <Route
        path="/admin"
        element={isAdmin ? <AdminLayout /> : <Login />}
      >
        <Route index element={<Dashboard />} />
        <Route path="courses" element={<AdminCoursesList />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;