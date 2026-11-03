# Envento Event Board

A responsive, static event-board site for Envento, the event management club at IIIT Vadodara, Gandhinagar Campus.

## Live site

https://somil9998.github.io/event-board/

## Files

- `index.html` contains the page structure, accessible navigation, event search, archive, team, and join form.
- `style.css` contains the palette, typography, responsive layouts, and event-state styling.
- `script.js` loads event data, renders event cards, and handles search, RSVP, navigation, and form validation.
- `events.json` is the event data source used by the page.
- `favicon.jpg` is the image asset used by the page.
- `notes.txt` contains assignment notes and an appendix with the final `script.js`.

## Responsive behavior

The page starts with a compact, one-column phone layout. At 40rem, the event list uses two columns and the full navigation replaces the menu button. The event grid uses `repeat(auto-fit, minmax(15rem, 1fr))` to add columns as space allows. Fluid image sizing and `clamp()` type keep content adaptable between breakpoints.

## Run locally

From this folder, start a local web server:

```powershell
py -m http.server 8765
```

Then open http://localhost:8765/ in a browser. The page fetches `events.json`, so opening `index.html` directly as a `file://` URL will prevent the browser from loading event data. No build step or package installation is required.

## GitHub Pages

The site is published from the repository's `main` branch. Pushing updates to the site files republishes it automatically. GitHub Pages serves the page over HTTP, so it can load `events.json`.
