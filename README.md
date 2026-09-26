# Envento Event Board

A responsive, static event-board site for Envento, the event management club at IIIT Vadodara, Gandhinagar Campus.

## Live site

https://somil9998.github.io/event-board/

## Files

- `index.html` contains the page content, accessible navigation, events, archive, team, and join form.
- `style.css` contains the palette, typography, box model, mobile-first grid, and responsive breakpoints.
- `favicon.jpg` is the image asset used by the page.

## Responsive behavior

The page starts with a compact, one-column phone layout. At 40rem, the event list uses two columns and the full navigation replaces the menu button. The event grid uses `repeat(auto-fit, minmax(15rem, 1fr))` to add columns as space allows. Fluid image sizing and `clamp()` type keep content adaptable between breakpoints.

## Run locally

Open `index.html` in a browser. No build step or package installation is required.

## GitHub Pages

The site is published from the repository's `main` branch. Pushing updates to `index.html` or `style.css` republishes the site automatically.
