import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // 🚀 Ye line page ko bilkul top par le jayegi
    window.scrollTo(0, 0);
  }, [pathname, search]); // Jab bhi path ya URL ka category change ho

  return null;
};

export default ScrollToTop;