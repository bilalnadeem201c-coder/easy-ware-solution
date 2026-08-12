"use client";

import { useEffect, useState } from "react";
import Preloader from "./preloader";

export default function PreloaderWrapper() {
  const [show, setShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      const hasSeen = sessionStorage.getItem("easyware-preloader-shown");
      if (!hasSeen) {
        setShow(true);
        sessionStorage.setItem("easyware-preloader-shown", "true");

        // 2 seconds ke baad fade out start karo
        setTimeout(() => {
          setFadeOut(true);
        }, 2000);

        // 2.5 seconds ke baad completely unmount karo
        setTimeout(() => {
          setShow(false);
        }, 2500);
      }
    }
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.5s ease-out",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      <Preloader />
    </div>
  );
}