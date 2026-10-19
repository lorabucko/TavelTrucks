"use client";

import { useId, useState } from "react";
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { BsMap, BsX } from "react-icons/bs";
import { EMPTY_FILTERS, getCampers, getFilters, labels, priceLabel } from "@/lib/api";
import type { Filters } from "@/lib/types";
import { Badges, ErrorState, Meta } from "./UI";
import s from "./Catalog.module.css";

export default function Catalog() {
  const prefix = useId();
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState<Filters>({ ...EMPTY_FILTERS });
  const [filters, setFilters] = useState<Filters>({ ...EMPTY_FILTERS });
  const options = useQuery({ queryKey: ["filter-options"], queryFn: ({ signal }) => getFilters(signal), staleTime: Infinity });
  const query = useInfiniteQuery({
    queryKey: ["campers", filters],
    queryFn: ({ pageParam, signal }) => getCampers(pageParam, filters, signal),
    initialPageParam: 1,
    getNextPageParam: last => last.page < last.totalPages ? last.page + 1 : undefined,
  });
  const campers = query.data?.pages.flatMap(page => page.campers) ?? [];
  const groups: { key: "form" | "engine" | "transmission"; label: string; values: string[] }[] = [
    { key: "form", label: "Camper form", values: options.data?.forms ?? ["alcove", "panel_van", "integrated", "semi_integrated"] },
    { key: "engine", label: "Engine", values: options.data?.engines ?? ["diesel", "petrol", "hybrid", "electric"] },
    { key: "transmission", label: "Transmission", values: options.data?.transmissions ?? ["automatic", "manual"] },
  ];
  function clear() {
    void queryClient.resetQueries({ queryKey: ["campers", EMPTY_FILTERS], exact: true });
    setDraft({ ...EMPTY_FILTERS });
    setFilters({ ...EMPTY_FILTERS });
  }
  return <main id="main" className={`container ${s.layout}`}>
    <h1 className="visually-hidden">Camper catalog</h1>
    <aside className={s.sidebar} aria-label="Filter campers">
      <form onSubmit={event => { event.preventDefault(); setFilters({ ...draft, location: draft.location.trim() }); }}>
        <label htmlFor={`${prefix}-location`} className={s.locationLabel}>Location</label>
        <div className={s.location}><BsMap aria-hidden="true" /><input id={`${prefix}-location`} placeholder="City" value={draft.location} onChange={e => setDraft({ ...draft, location: e.target.value })} /></div>
        <h2>Filters</h2>
        {groups.map(group => <fieldset className={s.group} key={group.key}>
          <legend>{group.label}</legend>
          {group.values.map(value => <label key={value} className={s.radio}>
            <input type="radio" name={group.key} value={value} checked={draft[group.key] === value} onChange={() => setDraft({ ...draft, [group.key]: value })} />
            <span>{labels[value]}</span>
          </label>)}
        </fieldset>)}
        <div className={s.actions}>
          <button type="submit" className="button">Search</button>
          <button type="button" className="button button-outline" onClick={clear}><BsX size={22} aria-hidden="true" />Clear filters</button>
        </div>
      </form>
    </aside>
    <section className={s.results} aria-label="Available campers" aria-busy={query.isFetching}>
      <div className="visually-hidden" role="status" aria-live="polite">
        {query.isPending ? "Loading campers" : `${campers.length} of ${query.data?.pages[0]?.total ?? 0} campers loaded`}
      </div>
      {query.isPending && Array.from({ length: 4 }, (_, i) => <div key={i} className={s.skeleton}><div /><span /><span /><span /></div>)}
      {query.isError && !query.data && <ErrorState message={query.error.message} retry={() => query.refetch()} />}
      {!query.isPending && !query.isError && campers.length === 0 && <div className={s.empty}>
        <BsMap size={36} aria-hidden="true" /><h2>No campers found</h2><p>Try another location or clear your filters to explore more options.</p><button onClick={clear} className="button">Clear filters</button>
      </div>}
      {campers.map(camper => <article className={s.card} key={camper.id}>
        <img className={s.cover} src={camper.coverImage} alt={camper.name} loading="lazy" />
        <div className={s.cardBody}>
          <div className={s.cardHeading}><h2>{camper.name}</h2><span>{priceLabel(camper.price)}</span></div>
          <Meta camper={camper} />
          <p className={s.description}>{camper.description}</p>
          <Badges camper={camper} />
          <a href={`/catalog/${camper.id}/`} target="_blank" rel="noopener noreferrer" className={`button ${s.more}`} aria-label={`Show more about ${camper.name} (opens in a new tab)`}>Show more</a>
        </div>
      </article>)}
      {query.isError && query.data && <ErrorState message="Could not load more campers. Your current results are still available." retry={() => query.fetchNextPage()} />}
      {query.hasNextPage && <div className={s.loadMore}>
        <button className="button button-outline" onClick={() => query.fetchNextPage()} disabled={query.isFetchingNextPage}>{query.isFetchingNextPage ? "Loading…" : "Load more"}</button>
      </div>}
    </section>
  </main>;
}
