import type { Metadata } from "next";
import Catalog from "@/components/Catalog";

export const metadata: Metadata = { title: "Camper catalog", description: "Explore our campers. Filter by location, body type, engine and transmission to find your perfect travel companion." };
export default function CatalogPage() { return <Catalog />; }
