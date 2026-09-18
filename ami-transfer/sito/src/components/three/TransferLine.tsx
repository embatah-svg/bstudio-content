"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useSyncExternalStore } from "react";

const TransferLineScene = dynamic(() => import("./TransferLineScene"), { ssr: false });

const QUERY = "(prefers-reduced-motion: reduce), (max-width: 479px)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

// Sotto i 480 px e con prefers-reduced-motion il 3D viene sostituito da una
// foto reale della linea (budget di performance e accessibilità del piano).
export default function TransferLine() {
  const mode = useSyncExternalStore(
    subscribe,
    () => (window.matchMedia(QUERY).matches ? "photo" : "scene"),
    () => "pending"
  );

  if (mode === "pending") return null;

  if (mode === "photo") {
    return (
      <div className="absolute inset-0">
        <Image src="/images/linea-portale.webp" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,26,31,0.35)_0%,rgba(15,26,31,0.9)_70%,#0f1a1f_100%)]" />
      </div>
    );
  }

  return <TransferLineScene />;
}
