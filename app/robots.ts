import type { MetadataRoute } from "next";
import { SITE } from "@/lib/utils";

// AEO: AI answer-engine crawlers are explicitly allowed so ChatGPT, Claude,
// Perplexity, Copilot and AI Overviews can crawl and cite course pages.
// (`*` already allows them; the explicit rules document intent and survive a
// future tightening of the wildcard.) See also /llms.txt.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/"] })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
