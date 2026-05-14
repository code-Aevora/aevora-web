import { useEffect, useState } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const onChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
