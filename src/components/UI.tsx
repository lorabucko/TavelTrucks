import { BsDiagram3, BsFuelPump, BsTruck, BsWind, BsCupHot, BsDroplet, BsTv, BsBroadcast, BsSnow, BsGrid, BsLightningCharge, BsMap, BsStarFill } from "react-icons/bs";
import type { IconType } from "react-icons";
import type { Camper } from "@/lib/types";
import { labels, locationLabel } from "@/lib/api";
import s from "./UI.module.css";

const icons: Record<string, IconType> = {
  automatic: BsDiagram3, manual: BsDiagram3, diesel: BsFuelPump, petrol: BsFuelPump,
  hybrid: BsLightningCharge, electric: BsLightningCharge, ac: BsWind, kitchen: BsCupHot,
  water: BsDroplet, bathroom: BsDroplet, tv: BsTv, radio: BsBroadcast,
  refrigerator: BsSnow, microwave: BsGrid, gas: BsFuelPump,
};
export function Badges({ camper, full = false }: { camper: Camper; full?: boolean }) {
  const items = full
    ? [camper.transmission, ...camper.amenities, camper.engine, camper.form]
    : [camper.engine, camper.transmission, camper.form];
  return <ul className={s.badges} aria-label="Vehicle features">
    {items.map(item => { const Icon = icons[item] || BsTruck; return <li key={item}><Icon aria-hidden="true" />{labels[item] || item}</li>; })}
  </ul>;
}
export function Meta({ camper, reviewsLink = false }: { camper: Camper; reviewsLink?: boolean }) {
  const rating = <><BsStarFill className={s.star} aria-hidden="true" />{camper.rating} ({camper.totalReviews} Reviews)</>;
  return <div className={s.meta}>
    {reviewsLink ? <a href="#reviews">{rating}</a> : <span>{rating}</span>}
    <span><BsMap aria-hidden="true" />{locationLabel(camper.location)}</span>
  </div>;
}
export function Stars({ value }: { value: number }) {
  return <span className={s.stars} role="img" aria-label={`${value} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => <BsStarFill key={i} color={i < Math.round(value) ? "#ffc531" : "#dadde1"} aria-hidden="true" />)}
  </span>;
}
export function ErrorState({ message, retry }: { message: string; retry?: () => void }) {
  return <div className={s.state} role="alert"><h2>Something went wrong</h2><p>{message}</p>{retry && <button className="button button-outline" onClick={retry}>Try again</button>}</div>;
}
