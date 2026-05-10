import { getData, setData } from "./storage";

// ---------- USERS ----------

export const registerUser = (user) => {
  const users = getData("users");

  const exists = users.find(u => u.email === user.email);
  if (exists) return { error: "User already exists" };

  users.push(user);
  setData("users", users);

  return { success: true };
};

export const loginUser = (email) => {
  const users = getData("users");
  
  // Hardcode admin login logic directly inside the fake API for simplicity
  if (email === "mrsudheer2009@gmail.com") {
    return { id: "admin-id", name: "Admin", email: "mrsudheer2009@gmail.com" };
  }
  
  // Find user or create a temporary one so any email can log in
  let user = users.find(u => u.email === email);
  if (!user) {
    user = { id: Date.now().toString(), name: email.split("@")[0], email: email };
  }
  
  return user;
};

// ---------- ADMIN CHECK ----------

export const isAdminEmail = (email) => {
  return email === "mrsudheer2009@gmail.com";
};

// ---------- COURSES ----------
export const getCourses = () => getData("courses");

export const getCourseById = (id) => {
  const courses = getData("courses");
  return courses.find(c => c.id === id);
};

export const seedCourses = () => {
  const courses = getData("courses");
  if (courses.length === 0) {
    setData("courses", [
      { id: 1, title: "Trading Basics", level: "Beginner", price: 499 },
      { id: 2, title: "Advanced Strategies", level: "Advanced", price: 999 }
    ]);
  }
};

// ---------- MODULES ----------
export const getModulesByCourse = (courseId) => {
  const modules = getData("modules");
  return modules.filter(m => m.courseId === courseId);
};

export const seedModules = () => {
  const modules = getData("modules");
  if (modules.length === 0) {
    setData("modules", [
      { id: 1, courseId: 1, title: "Intro", isFree: true, video: "https://www.youtube.com/embed/ysz5S6PUM-U" },
      { id: 2, courseId: 1, title: "Market Basics", isFree: true, video: "https://www.youtube.com/embed/ysz5S6PUM-U" },
      { id: 3, courseId: 1, title: "Technical Analysis", isFree: false, video: "https://www.youtube.com/embed/ysz5S6PUM-U" }
    ]);
  }
};

// ---------- PURCHASE ----------
export const purchaseCourse = (userId, courseId) => {
  const purchases = getData("purchases");
  purchases.push({ userId, courseId });
  setData("purchases", purchases);
};

export const hasPurchased = (userId, courseId) => {
  const purchases = getData("purchases");
  return purchases.some(p => p.userId === userId && p.courseId === courseId);
};

// ---------- NEWS ----------
export const getNews = () => getData("news");

export const seedNews = () => {
  const news = getData("news");
  if (news.length === 0) {
    setData("news", [
      { id: 1, title: "Sensex Hits High", description: "Markets rally today", date: "2026-05-01" }
    ]);
  }
};

export const addCourse = (course) => {
  const courses = getData("courses");
  courses.push(course);
  setData("courses", courses);
};

export const addModule = (module) => {
  const modules = getData("modules");
  modules.push(module);
  setData("modules", modules);
};

export const addNews = (item) => {
  const news = getData("news");
  news.push(item);
  setData("news", news);
};