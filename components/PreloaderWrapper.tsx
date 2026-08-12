"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Preloader from "./preloader";

export default function PreloaderWrapper() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only run on client after hydration
    setMounted(true);
    
    if (pathname === "/") {
      const hasSeen = sessionStorage.getItem("easyware-preloader-shown");
      if (!hasSeen) {
        setShow(true);
        sessionStorage.setItem("easyware-preloader-shown", "true");
      }
    }
  }, [pathname]);

  // Don't render anything during SSR or before mount
  if (!mounted) return null;
  
  if (!show) return null;
  
  return <Preloader />;
}