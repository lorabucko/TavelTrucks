"use client";
import { ErrorState } from "@/components/UI";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main id="main" className="container" style={{ paddingBlock: 64 }}><ErrorState message="We couldn't load this page. Please check your connection and try again." retry={reset} /></main>;
}
