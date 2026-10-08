# RIL Community Gallery

One-page Next.js App Router gallery using the supplied RIL Media kit. Includes 633 unique photos across MIWS, Kids Summer Camp, KCC, Hack and Chill, Demo Day, Friday Play It, NACOS, PowerPoint Friday, and SEEESS Event. Date and folder filters distinguish collections, including MIWS August, camp graduation, and Demo Day July and September. Five Streamable videos are mixed among the photos in the default album view. Progressive browsing and a keyboard-accessible photo viewer keep larger collections manageable. Photos and smaller grid previews are self-hosted as WebP files.

## Preview

Run `npm install`, then `npm run dev` and visit http://127.0.0.1:3000.

Run `npm run typecheck` for TypeScript validation and `npm run build` to generate the deployable static export in `out`. Static exports use real Next.js server rendering at build time and React hydration for the interactive gallery.

## Edit

This folder is the project root. Run all npm commands here.

```text
ril gallery/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx            # Metadata and fonts
│   │   └── globals.css           # Styling and responsive layouts
│   ├── components/
│   │   ├── gallery/
│   │   │   ├── gallery.tsx       # Album navigation and selection state
│   │   │   ├── photo.tsx         # Image rendering and errors
│   │   │   ├── photo-viewer.tsx  # Modal, keyboard controls and thumbnails
│   │   │   └── types.ts          # Gallery component types
│   │   └── ui/icon.tsx           # Shared SVG icons
│   └── data/albums.ts            # Album names, photos and Drive links
├── public/assets/               # Photos, logo and local fonts
├── docs/                        # Design direction and verification notes
├── archive/                     # Earlier working files, excluded from Git
├── .openai/hosting.json          # Existing site identity and hosting config
├── next.config.ts
├── tsconfig.json
├── package.json
└── package-lock.json
```

Add photos and matching previews to `public/assets`, update `src/data/additional-photos.json` and `src/data/photo-dimensions.json`, and register new albums in `src/data/albums.ts`. Video sources live in `src/data/videos.ts`. Import source modules using `@/`, which maps to `src/`.

The footer lives in `src/components/site-footer.tsx`. Social SVG icons live in `src/components/ui/icon.tsx`.

`node_modules`, `.next`, and `out` are generated dependency, cache, and build directories; they are excluded from Git. The previous static implementation and media-processing files are preserved in `archive`, not used by the Next.js application.

Fonts are self-hosted through `next/font/local`. Images use `next/image` with fixed layout containers and lazy loading. The logo was extracted directly from page 15 of the provided media kit. Original album links, website, and social accounts come from the user's Drive folder and media kit.
