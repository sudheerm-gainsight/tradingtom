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
      { id: 2, title: "Advanced Strategies", level: "Advanced", price: 999 },
      { id: 3, title: "Options Trading Mastery", level: "Advanced", price: 1499 },
      { id: 4, title: "Forex for Beginners", level: "Beginner", price: 599 },
      { id: 5, title: "Cryptocurrency Investing", level: "Intermediate", price: 799 },
      { id: 6, title: "Day Trading Setup", level: "Intermediate", price: 899 },
      { id: 7, title: "Swing Trading Secrets", level: "Advanced", price: 1299 },
      { id: 8, title: "Algorithmic Trading Intro", level: "Advanced", price: 1999 }
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
      { id: 3, courseId: 1, title: "Technical Analysis", isFree: false, video: "https://www.youtube.com/embed/ysz5S6PUM-U" },
      { id: 4, courseId: 2, title: "Advanced Strategies Overview", isFree: true, video: "https://www.youtube.com/embed/ysz5S6PUM-U" },
      { id: 5, courseId: 3, title: "Introduction to Options", isFree: true, video: "https://www.youtube.com/embed/ysz5S6PUM-U" },
      { id: 6, courseId: 4, title: "What is Forex?", isFree: true, video: "https://www.youtube.com/embed/ysz5S6PUM-U" },
      { id: 7, courseId: 5, title: "Crypto Wallets & Exchanges", isFree: true, video: "https://www.youtube.com/embed/ysz5S6PUM-U" },
      { id: 8, courseId: 6, title: "Setting Up Your Charts", isFree: true, video: "https://www.youtube.com/embed/ysz5S6PUM-U" },
      { id: 9, courseId: 7, title: "Finding the Right Swing", isFree: true, video: "https://www.youtube.com/embed/ysz5S6PUM-U" },
      { id: 10, courseId: 8, title: "Python for Trading", isFree: true, video: "https://www.youtube.com/embed/ysz5S6PUM-U" }
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