"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Preloader from "./preloader";

export default function PreloaderWrapper() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (pathname === "/") {
      const hasSeen = sessionStorage.getItem("easyware-preloader-shown");
      if (!hasSeen) {
        setShow(true);
        sessionStorage.setItem("easyware-preloader-shown", "true");
      }
    }
  }, [pathname]);

  if (!show) return null;
  return <Preloader />;
}