type Environment = Readonly<Record<string, string | undefined>>;

export function isIndexingEnabled(env: Environment = process.env): boolean {
  return env.SITE_INDEXABLE === "true" && env.VERCEL_ENV === "production";
}

export function getSiteUrl(env: Environment = process.env): URL | undefined {
  const value = env.NEXT_PUBLIC_SITE_URL?.trim();
  const indexable = isIndexingEnabled(env);

  if (!value) {
    if (indexable) {
      throw new Error(
        "NEXT_PUBLIC_SITE_URL is required when production indexing is enabled.",
      );
    }
    return undefined;
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute URL.");
  }

  if (indexable && url.protocol !== "https:") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must use HTTPS when production indexing is enabled.",
    );
  }

  if (url.pathname !== "/" || url.search || url.hash) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be a site origin without a path.",
    );
  }

  return url;
}
