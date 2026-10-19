import { test } from "node:test";
import assert from "node:assert/strict";

const base = process.env.NEXT_PUBLIC_API_URL || "https://campers-api.goit.study";
async function get(path) {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200);
  return response.json();
}

test("catalog requests four campers and the next page has no duplicates", async () => {
  const first = await get("/campers?page=1&perPage=4");
  const next = await get("/campers?page=2&perPage=4");
  assert.equal(first.campers.length, 4);
  assert.equal(next.campers.length, 4);
  assert.equal(new Set([...first.campers, ...next.campers].map(x => x.id)).size, 8);
  assert.ok(first.totalPages > 1);
});

test("all four filters are applied by the backend", async () => {
  const result = await get("/campers?page=1&perPage=4&location=Kyiv&form=semi_integrated&engine=diesel&transmission=automatic");
  assert.ok(result.campers.length > 0);
  for (const camper of result.campers) {
    assert.match(camper.location, /kyiv/i);
    assert.equal(camper.form, "semi_integrated");
    assert.equal(camper.engine, "diesel");
    assert.equal(camper.transmission, "automatic");
  }
});

test("a nonexistent location returns an empty list", async () => {
  const result = await get("/campers?page=1&perPage=4&location=NoSuchCityTravelTrucksQA");
  assert.equal(result.total, 0);
  assert.deepEqual(result.campers, []);
});

test("detail endpoint includes gallery and review ratings use a five-star scale", async () => {
  const list = await get("/campers?perPage=4");
  const camper = await get(`/campers/${list.campers[0].id}`);
  assert.ok(camper.gallery.length > 0);
  assert.ok(camper.description);
  const reviews = await get(`/campers/${camper.id}/reviews`);
  assert.ok(reviews.length > 0);
  for (const review of reviews) {
    assert.ok(review.reviewer_rating >= 1 && review.reviewer_rating <= 5);
    assert.ok(review.reviewer_name);
    assert.ok(review.comment);
  }
});
