import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Apna Vyapar",
    short_name: "ApnaVyapar",
    description: "Start your first business in India with AI guidance",
    start_url: "/",
    display: "standalone",
    background_color: "#F8FAFC",
    theme_color: "#0F766E",
  };
}