/**
 *
 * @param path optional parameter that represents a path a specific strapi endpoint
 * @returns the strapi API URL
 *
 * @description returns the strapi URL set in NEXT_PUBLIC_STRAPI_API_URL or defaults to http://localhost:1337
 */
export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

/**
 *
 * @param url
 * @returns the correct media url regardless whether it is hosted on strapi or an external provider
 */
export function getStrapiMedia(url: string | null) {
  if (url == null) {
    return null;
  }

  // Return the full URL if the media is hosted on an external provider
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }

  // Otherwise prepend the URL path with the Strapi URL
  return `${getStrapiURL()}${url}`;
}

/**
 * TODO: add support for multiple locales
 */
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
