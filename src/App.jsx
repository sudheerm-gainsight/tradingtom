import { HashRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import PXTracker from "./components/PXTracker";

function App() {
  return (
    <HashRouter>
      <PXTracker />
      <AppRoutes />
    </HashRouter>
  );
}

export default App;