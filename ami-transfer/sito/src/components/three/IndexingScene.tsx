"use client";

import dynamic from "next/dynamic";

const TransferLineScene = dynamic(() => import("./TransferLineScene"), { ssr: false });

// Schema 3D del ciclo di indexaggio (avanzamento a passo, discesa teste,
// lavorazione, risalita). Spiega il principio; le foto mostrano la macchina.
export default function IndexingScene({ caption }: { caption: string }) {
  return (
    <figure className="m-0">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-petrol">
        <TransferLineScene />
      </div>
      <figcaption className="mt-3 border-t border-[rgba(19,26,30,0.25)] pt-2 text-[14px] text-[#5a6870]">{caption}</figcaption>
    </figure>
  );
}
