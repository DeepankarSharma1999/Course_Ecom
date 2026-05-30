import { NextResponse } from "next/server";
import { City } from "country-state-city";
import { COUNTRIES } from "@/lib/seed-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const countrySlug = searchParams.get("countrySlug");

  if (!countrySlug) {
    return NextResponse.json({ error: "Missing countrySlug parameter" }, { status: 400 });
  }

  const country = COUNTRIES.find((c) => c.slug === countrySlug);
  
  if (!country) {
    return NextResponse.json({ error: "Country not found in supported list" }, { status: 404 });
  }

  // Fetch all cities for the matched country code (e.g., "FR", "IN")
  const cities = City.getCitiesOfCountry(country.code);

  if (!cities) {
    return NextResponse.json([]);
  }

  // Transform to our expected format { slug, name }
  const formattedCities = cities.map((city) => ({
    slug: city.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    name: city.name,
  }));

  // Remove duplicates (sometimes the library has multiple entries for the same city in different states)
  const uniqueCities = Array.from(new Map(formattedCities.map((c) => [c.slug, c])).values());

  return NextResponse.json(uniqueCities);
}
