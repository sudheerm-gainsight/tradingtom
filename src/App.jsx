import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import PXTracker from "./components/PXTracker";

function App() {
  return (
    <BrowserRouter basename="/tradingtom/">
      <PXTracker />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;