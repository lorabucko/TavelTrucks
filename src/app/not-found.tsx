import Link from "next/link";

export default function NotFound() {
  return <main id="main" className="container" style={{ paddingBlock: 100, textAlign: "center" }}>
    <h1 style={{ fontSize: 32 }}>This road leads somewhere else.</h1>
    <p style={{ margin: "20px 0 32px", color: "var(--text)" }}>We couldn&apos;t find this camper or page. Your next adventure is still waiting in our catalog.</p>
    <Link href="/catalog/" className="button">Back to catalog</Link>
  </main>;
}
