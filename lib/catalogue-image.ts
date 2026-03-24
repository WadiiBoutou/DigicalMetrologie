import type { SyntheticEvent } from "react";

/** Shown when `/images/catalogue/<ref>.jpg` is missing or fails to load. */
export const CATALOGUE_IMAGE_PLACEHOLDER = "/images/catalogue/placeholder.svg";

/**
 * Expected file: `public/images/catalogue/ref-ind-001.jpg` (slug = ref lowercased).
 * Add your own photos with matching filenames, or change extension in `products.ts` map.
 */
export function catalogueImagePathFromRef(ref: string): string {
  const slug = ref.trim().toLowerCase().replace(/\s+/g, "-");
  return `/images/catalogue/${slug}.jpg`;
}

export function onCatalogueImageError(e: SyntheticEvent<HTMLImageElement>): void {
  const el = e.currentTarget;
  if (el.src.includes("placeholder.svg")) return;
  el.src = CATALOGUE_IMAGE_PLACEHOLDER;
}
