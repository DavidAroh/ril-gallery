# RIL Community Gallery

One-page static gallery based on the supplied RIL Media kit. All 13 photographs from the four shared image folders are included as optimized WebP files. Video folders are linked through each original programme album, but videos are not embedded.

## Preview

From `dist`, run `python -m http.server 5173` and visit http://localhost:5173.

## Edit

`dist/index.html` contains page content, `dist/style.css` contains responsive styling, and `dist/gallery.js` defines the albums and photo viewer. Add photos to `dist/assets` and update the matching album entry in `gallery.js`.

Fonts and photographs are served locally. The logo was extracted directly from page 15 of the provided media kit. Original album links, website, and social accounts come from the user's Drive folder and media kit.
