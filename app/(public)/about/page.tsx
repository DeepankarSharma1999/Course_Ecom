import type { Metadata } from "next";
import { AboutClient } from "./about-client";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return { 
    title: "About Us | ULearnSystems", 
    description: "ULearnSystems is a globally recognized leader in professional certification and corporate training, dedicated to bridging the global skills gap." 
  };
}

export default async function AboutPage() {
  return <AboutClient />;
}
