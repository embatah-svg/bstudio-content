"use client";

import dynamic from "next/dynamic";

const TransferLineScene = dynamic(() => import("./TransferLineScene"), {
  ssr: false,
});

export default function TransferLine() {
  return <TransferLineScene />;
}
