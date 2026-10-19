import Link from "next/link";
import s from "./page.module.css";

export default function HomePage() {
  return <main id="main" className={s.hero}>
    <img src="/hero.jpg" alt="" className={s.image} fetchPriority="high" />
    <div className={`container ${s.content}`}>
      <h1>Campers of your dreams</h1>
      <p>You can find everything you want in our catalog</p>
      <Link href="/catalog/" className={`button ${s.cta}`}>View Now</Link>
    </div>
  </main>;
}
