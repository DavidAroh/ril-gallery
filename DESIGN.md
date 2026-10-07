---
name: RIL gallery
description: A community photo essay in RIL's visual identity.
colors:
  primary: "#177ae5"
  blue-ink: "#1264bd"
  ink: "#212120"
  muted: "#62686f"
  line: "#dce2e8"
  surface: "#f1f5f9"
  white: "#ffffff"
  viewer: "#151515"
typography:
  display:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "clamp(48px, 6.5vw, 96px)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "clamp(28px, 3.3vw, 46px)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "13px"
    fontWeight: 600
rounded:
  square: "0px"
  thumbnail: "3px"
  circular: "50%"
spacing:
  caption: "10px"
  control: "16px"
  group: "24px"
  wide: "32px"
  section: "88px"
components:
  cover-action:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "12px 18px"
  cover-action-hover:
    backgroundColor: "{colors.blue-ink}"
    textColor: "{colors.white}"
  text-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    height: "44px"
  album-navigation:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "24px 28px"
  album-navigation-current:
    textColor: "{colors.blue-ink}"
  viewer-control:
    textColor: "{colors.white}"
    rounded: "{rounded.circular}"
    width: "48px"
    height: "48px"
  viewer-thumbnail:
    rounded: "{rounded.thumbnail}"
    width: "64px"
    height: "48px"
---

# Design System: RIL gallery

## Overview

**Creative North Star: "Community photo essay"**

Photographs and people lead. White space, compact descriptive captions, and restrained Open Sans typography frame the supplied community images. The interface uses RIL blue for emphasis and charcoal for reading.

The material character is flat and editorial. Preserve the original horizontal RIL logo and original photographic color. The page's cover and album compositions are its current expression; reusable controls remain quiet, explicit, and keyboard accessible.

**Key Characteristics:**

- Unaltered community photography.
- White space and blue functional emphasis.
- Flat surfaces and compact captions.
- Responsive editorial photo spreads.

## Colors

One blue accent family sits against cool pale surfaces and charcoal text. Frontmatter values are the extracted source tokens.

### Primary

- **RIL Blue:** identity accent and visible focus outlines.
- **Reading Blue:** display title, current album marker, link hover, and the solid about section. This darker blue supports small text and white text on the about surface.

### Neutral

- **Charcoal:** body text and default controls.
- **Caption Gray:** captions, counts, and supporting text.
- **Divider Gray:** persistent navigation separator.
- **Cool Surface:** image placeholders and loading failure surfaces.
- **White:** page background and photo action surfaces.
- **Viewer Black:** full-screen photo viewer and its backdrop.

**The Original Color Rule.** Preserve photographic color and the supplied logo; use interface color around those assets.

## Typography

**Display Font:** Open Sans (sans-serif fallback).
**Body Font:** Open Sans (sans-serif fallback).

The single family maintains the media kit's identity. Size and weight establish hierarchy; labels use normal sentence case. Headings use balanced wrapping and semibold weight.

### Hierarchy

- **Display:** the frontmatter display role introduces the gallery; mobile fixes its size at (58px).
- **Headline:** album names use the headline role; mobile uses (29px).
- **Title:** the viewer album title uses the title role; mobile uses (18px).
- **Body:** the global role establishes the baseline. Intro and about prose use (14px) with (1.8) line height; about copy is limited to (68ch).
- **Label:** navigation and underlined actions use the label role. Photo captions use (12px), regular weight, and (1.6) line height, limited to (65ch); mobile captions use (11px).
- **Counters:** tabular numerals keep photo counts stable in navigation and the viewer.

## Layout

The content container is capped at (1320px) and subtracts (112px) from viewport width. At (1000px) and below it subtracts (64px); at (640px) and below it subtracts (40px). The header height moves from (88px) to (76px). The cover spans the viewport and uses `clamp(360px, 37vw, 570px)` height, becoming (340px) on mobile.

Album spreads use a (1.5fr / 1fr) grid with (26px / 32px) row/column gaps: one large photograph spans two supporting rows. KCC reverses the columns. Summer uses equal columns and offsets even photographs by (52px). Default photo heights are (552px) for the lead and (244px) for supports. Tablet reduces them to (458px) and (200px), with (24px) gaps.

At the mobile breakpoint, three-photo albums put a (290px) lead across both columns and (170px) supporting photos beneath, with (18px / 12px) gaps. Summer retains equal columns, (210px) images, and a (30px) stagger. Album separation moves from (88px) to (64px) to (48px). About content moves from two columns to one.

Album navigation sticks to the top edge and becomes a two-column, two-row grid on mobile. Global scroll padding is (104px). The viewer fills (100vw / 100dvh), contains the full image, stacks its footer at tablet width, and places previous/next controls over the lower stage corners on mobile.

## Elevation & Depth

There are no box shadows. White action surfaces contrast against photographs; thin dividers separate navigation; the viewer's dark field isolates the full image. A small photo zoom provides hover feedback without changing layout: (1.025) scale over (0.6s) with `cubic-bezier(0.16, 1, 0.3, 1)`. Reduced motion disables transitions, animations, and smooth scrolling.

## Shapes

Photo frames, action labels, and page surfaces have square corners. Viewer controls are circular; thumbnails have a small rounded corner. Frames clip crops with overflow hidden, while viewer images use contain sizing. The global focus indicator is a blue (3px) outline with (5px) offset.

## Components

### Buttons

Photo buttons expose enlarged viewing with a white expansion affordance. On desktop the affordance appears on hover or keyboard focus; on mobile it remains visible. The cover action uses a white label that changes to Reading Blue with white text on hover. Viewer controls are transparent circular buttons with a thin gray border, a darker hover surface, and white icons. Disabled buttons use (0.5) opacity.

### Cards / Containers

Photographs sit in figures with captions directly below; they have no card shell, shadow, or decorative border. Placeholders and image failures use Cool Surface. The full-screen native dialog uses Viewer Black and displays the uncropped image.

### Navigation

Header navigation is compact and semibold, with (44px) minimum link height. Album links pair a folder icon, name, and count; current location uses Reading Blue and a (2px) bottom border. Hover adds a pale blue background. Mobile album links have (52px) minimum height, and the header's visit link is hidden.

### Text Links

Underlined actions have a (44px) minimum height and optional small inline arrow. Reading Blue marks hover. Original album links remain visually separate beside each album name; mobile stacks their metadata.

### Photo Viewer

Month and folder filters use 44px pills with Reading Blue for the selected state. Each programme initially renders six photos; Show more adds twelve at a time. Large lead images use the full asset while supporting images use 480px previews. A native details disclosure links all original collections. The viewer stays within the selected collection, uses full images, and shows a moving five-thumbnail window. Mobile thumbnails are 48px wide to fit narrow viewports.

The viewer offers previous/next buttons, thumbnail selection, photo count, caption, and close control. Arrow keys move within the selected album; Escape closes the dialog and focus returns to the invoking control. The active thumbnail has a white border and full opacity; others use (0.6) opacity. Loading uses a small rotating indicator; failure text occupies the image surface.

### Footer

The white footer uses a three-column grid: the original logo and location, album navigation, and community links. Below 640px the brand occupies a full row and the link groups share two columns. Links have at least 44px hit areas. Instagram and X are icon-only circular links with accessible names and 20px SVG marks; Visit RIL retains its text and external arrow. Social controls have fine-pointer hover feedback and subtle press feedback, disabled for reduced motion. There is no bottom sign-off or back-to-top row.

## Do's and Don'ts

### Do:

- **Do** use Open Sans and the supplied horizontal RIL logo.
- **Do** keep photo colors intact and captions descriptive.
- **Do** preserve visible keyboard focus and reduced-motion behavior.
- **Do** use the responsive spread patterns and full-image viewer for photographic context.

### Don't:

- **Don't** modify the logo with decorative effects.
- **Don't** replace factual captions with invented event details or dates.
- **Don't** add shadows or rounded card shells to the existing photo figures.
- **Don't** make hover the only way to discover photo opening on mobile.
