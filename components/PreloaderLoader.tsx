"use client";

import dynamic from "next/dynamic";

const PreloaderWrapper = dynamic(
  () => import("./PreloaderWrapper"),
  { ssr: false }
);

export default function PreloaderLoader() {
  return <PreloaderWrapper />;
}