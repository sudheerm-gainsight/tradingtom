import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function PXTracker() {
  const location = useLocation();

  useEffect(() => {
    if (window.aptrinsic) {
      window.aptrinsic("trackPageview");
      console.log("PX Pageview Tracked:", location.pathname);
    }
  }, [location]);

  return null;
}

export default PXTracker;
