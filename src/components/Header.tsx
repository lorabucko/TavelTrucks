"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import s from "./Header.module.css";

export default function Header() {
  const path = usePathname();
  const catalog = path.startsWith("/catalog");
  return <header className={s.header}>
    <div className={s.inner}>
      <Link href="/" className={s.logo} aria-label="TravelTrucks home">Travel<span>Trucks</span></Link>
      <nav className={s.nav} aria-label="Main navigation">
        <Link href="/" aria-current={!catalog ? "page" : undefined}>Home</Link>
        <Link href="/catalog/" aria-current={catalog ? "page" : undefined}>Catalog</Link>
      </nav>
    </div>
  </header>;
}
