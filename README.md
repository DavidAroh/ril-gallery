# RIL Community Gallery

One-page Next.js App Router gallery, refined using the Impeccable design skill and the supplied RIL Media kit. All 13 photographs from the four shared image folders are included as WebP files. Video folders are linked through each original programme album, but videos are not embedded.

## Preview

Run `npm install`, then `npm run dev` and visit http://127.0.0.1:3000.

Run `npm run typecheck` for TypeScript validation and `npm run build` to generate the deployable static export in `out`. Static exports use real Next.js server rendering at build time and React hydration for the interactive gallery.

## Edit

`app/page.tsx` contains the page, `app/globals.css` contains responsive styling, and `components/gallery.tsx` owns album navigation and the native photo-viewer dialog. Add photos to `public/assets` and update `components/albums.ts`.

Fonts are self-hosted through `next/font/local`. Images use `next/image` with fixed layout containers and lazy loading. The logo was extracted directly from page 15 of the provided media kit. Original album links, website, and social accounts come from the user's Drive folder and media kit.
