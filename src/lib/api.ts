import type { AvailableFilters, BookingPayload, CamperDetails, CamperPage, Filters, Review } from "./types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://campers-api.goit.study";
export const PAGE_SIZE = 4;
export const EMPTY_FILTERS: Filters = { location: "", form: "", engine: "", transmission: "" };

export class ApiError extends Error {
  constructor(message: string, public status: number) { super(message); this.name = "ApiError"; }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { Accept: "application/json", ...init?.headers },
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = Array.isArray(body?.message) ? body.message.join(". ") : body?.message;
    throw new ApiError(message || "Something went wrong. Please try again.", response.status);
  }
  return response.json() as Promise<T>;
}

export function getCampers(page: number, filters: Filters, signal?: AbortSignal) {
  const params = new URLSearchParams({ page: String(page), perPage: String(PAGE_SIZE) });
  for (const [key, value] of Object.entries(filters)) {
    if (value.trim()) params.set(key, value.trim());
  }
  return request<CamperPage>(`/campers?${params}`, { signal });
}

export const getFilters = (signal?: AbortSignal) => request<AvailableFilters>("/campers/filters", { signal });
export const getCamper = (id: string) => request<CamperDetails>(`/campers/${encodeURIComponent(id)}`);
export const getReviews = (id: string, signal?: AbortSignal) => request<Review[]>(`/campers/${encodeURIComponent(id)}/reviews`, { signal });
export const createBooking = (id: string, payload: BookingPayload) =>
  request<{ message: string }>(`/campers/${encodeURIComponent(id)}/booking-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const labels: Record<string, string> = {
  alcove: "Alcove", panel_van: "Panel Van", integrated: "Integrated", semi_integrated: "Semi Integrated",
  diesel: "Diesel", petrol: "Petrol", hybrid: "Hybrid", electric: "Electric",
  automatic: "Automatic", manual: "Manual", ac: "AC", kitchen: "Kitchen", bathroom: "Bathroom",
  tv: "TV", radio: "Radio", refrigerator: "Refrigerator", microwave: "Microwave", gas: "Gas", water: "Water",
};
export const priceLabel = (price: number) => `€${price.toFixed(2)}`;
export const locationLabel = (location: string) => location.split(",").map(x => x.trim()).reverse().join(", ");
