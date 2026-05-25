// Minimal in-memory rate limiter — good enough for single-instance setups.
// For multi-instance / serverless production, swap for an Upstash/Redis-backed limiter.

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; retryAfter: number; remaining: number } {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0, remaining: limit - 1 };
  }
  bucket.count++;
  if (bucket.count > limit) {
    return { ok: false, retryAfter: Math.max(0, bucket.resetAt - now), remaining: 0 };
  }
  return { ok: true, retryAfter: 0, remaining: limit - bucket.count };
}

// Sweep old keys every 5 minutes so we don't grow unbounded.
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [k, v] of buckets) if (v.resetAt < now) buckets.delete(k);
  }, 5 * 60 * 1000).unref?.();
}
