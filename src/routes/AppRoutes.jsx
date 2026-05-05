import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Layout Components
import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";

// User Application Pages
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Courses from "../pages/Courses";
import CourseDetail from "../pages/CourseDetail";
import Payment from "../pages/Payment";
import News from "../pages/News";
import Forum from "../pages/Forum";
import WidgetPuzzle from "../pages/WidgetPuzzle";

// Admin Application Pages
import Dashboard from "../admin/Dashboard";

function AppRoutes() {
  // Grab the isAdmin flag from our AuthContext to protect admin routes
  const { isAdmin } = useAuth();

  return (
    <BrowserRouter>
      <Routes>

        {/* 
            USER APP ROUTES
            All these routes are wrapped in the MainLayout component.
            MainLayout includes the Navbar, SearchBar, and Footer. 
        */}
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

        {/* 
            ADMIN APP ROUTES
            This route uses a ternary operator to check if the user is an admin.
            If isAdmin is true, it renders AdminLayout.
            If isAdmin is false, it redirects unauthorized users to the Login page. 
        */}
        <Route
          path="/admin"
          element={isAdmin ? <AdminLayout /> : <Login />}
        >
          {/* Default child route for /admin */}
          <Route index element={<Dashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;