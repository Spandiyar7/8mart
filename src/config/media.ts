/**
 * Media availability flags.
 *
 * The site ships with premium generated placeholders. Once real photos
 * are added to `public/products/` and `public/brand-photos/`, flip the
 * matching flag to `true` and the photo frames will use `next/image`.
 *
 * See README.md → "Photo system" for filenames and instructions.
 */

/** Set to `true` after adding bouquet photos to `public/products/`. */
export const productPhotosAvailable = true;

/** Set to `true` after adding brand/lifestyle photos to `public/brand-photos/`. */
export const brandPhotosAvailable = true;
