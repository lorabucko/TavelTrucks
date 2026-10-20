import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { API_URL, ApiError, getCamper, getReviews } from "@/lib/api";
import type { CamperPage, Review } from "@/lib/types";
import CamperDetail from "@/components/CamperDetail";

type Props = { params: Promise<{ camperId: string }> };

export async function generateStaticParams() {
  if (process.env.PREVIEW_EXPORT !== "true") return [];
  const response = await fetch(`${API_URL}/campers?perPage=10&page=1`);
  if (!response.ok) throw new Error("Cannot retrieve campers for preview export");
  const data: CamperPage = await response.json();
  const rest = await Promise.all(
    Array.from({ length: data.totalPages - 1 }, async (_, i) => {
      const next = await fetch(`${API_URL}/campers?perPage=10&page=${i + 2}`);
      if (!next.ok) throw new Error("Cannot retrieve the next page of campers");
      return (await next.json() as CamperPage).campers;
    }),
  );
  return [...data.campers, ...rest.flat()].map(camper => ({ camperId: camper.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { camperId } = await params;
  try {
    const camper = await getCamper(camperId);
    return { title: camper.name, description: camper.description };
  } catch { return { title: "Camper details" }; }
}

export default async function CamperPage({ params }: Props) {
  const { camperId } = await params;
  let camper;
  try { camper = await getCamper(camperId); }
  catch (error) { if (error instanceof ApiError && error.status === 404) notFound(); throw error; }
  let reviews: Review[] = [];
  let reviewsError: string | null = null;

  try {
    reviews = await getReviews(camperId);
  } catch {
    reviewsError =
      "Could not load reviews. Please refresh the page to try again.";
  }

  return <CamperDetail camper={camper} reviews={reviews} reviewsError={reviewsError} />;
}
