export type CamperForm = "alcove" | "panel_van" | "integrated" | "semi_integrated";
export type Engine = "diesel" | "petrol" | "hybrid" | "electric";
export type Transmission = "automatic" | "manual";
export type Amenity = "ac" | "bathroom" | "kitchen" | "tv" | "radio" | "refrigerator" | "microwave" | "gas" | "water";

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  totalReviews: number;
  location: string;
  description: string;
  form: CamperForm;
  engine: Engine;
  transmission: Transmission;
  amenities: Amenity[];
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
}

export interface CamperListItem extends Camper { coverImage: string }
export interface GalleryImage { id: string; thumb: string; original: string; order: number }
export interface CamperDetails extends Camper { gallery: GalleryImage[] }
export interface CamperPage {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: CamperListItem[];
}
export interface Review {
  id: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}
export interface Filters {
  location: string;
  form: CamperForm | "";
  engine: Engine | "";
  transmission: Transmission | "";
}
export interface AvailableFilters {
  forms: CamperForm[];
  engines: Engine[];
  transmissions: Transmission[];
}
export interface BookingPayload { name: string; email: string }
