"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce), (max-width: 479px)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

const OVERLAY =
  "absolute inset-0 bg-[linear-gradient(180deg,rgba(15,26,31,0.35)_0%,rgba(15,26,31,0.55)_45%,rgba(15,26,31,0.92)_80%,#0f1a1f_100%)]";

// Hero: girato reale delle linee A.M.I. (video aziendale 2021), muto, in loop.
// Sotto i 480 px e con prefers-reduced-motion resta il poster: niente
// download video sul telefono, niente movimento non richiesto.
export default function TransferLine() {
  const mode = useSyncExternalStore(
    subscribe,
    () => (window.matchMedia(QUERY).matches ? "poster" : "video"),
    () => "pending"
  );

  if (mode === "pending") return null;

  if (mode === "poster") {
    return (
      <div className="absolute inset-0">
        <Image src="/video/hero-poster.webp" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className={OVERLAY} />
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "saturate(0.75) contrast(1.05)" }}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/video/hero-poster.webp"
        aria-hidden="true"
      >
        <source src="/video/hero-loop.webm" type="video/webm" />
        <source src="/video/hero-loop.mp4" type="video/mp4" />
      </video>
      <div className={OVERLAY} />
    </div>
  );
}
