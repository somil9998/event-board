# Envento Event Board

A responsive, static event-board site for Envento, the event management club at IIIT Vadodara, Gandhinagar Campus.

## Live site

https://somil9998.github.io/event-board/

## Files

- `index.html` contains the page structure, accessible navigation, event search, archive, team, and join form.
- `style.css` contains the palette, typography, responsive layouts, and event-state styling.
- `script.js` loads and renders events, shows the first title from the XML data, and handles search, RSVP, navigation, and form validation.
- `events.json` is the event data source used by the page over HTTP.
- `events.xml` contains the same event records in XML format.
- `index.html` embeds a copy of the JSON event data so event cards still load when opened directly from a local folder.
- `favicon.jpg` is the image asset used by the page.
- `notes.txt` contains assignment notes and an appendix with the final `script.js`.

## Responsive behavior

The page starts with a compact, one-column phone layout. At 40rem, the event list uses two columns and the full navigation replaces the menu button. The event grid uses `repeat(auto-fit, minmax(15rem, 1fr))` to add columns as space allows. Fluid image sizing and `clamp()` type keep content adaptable between breakpoints.

## Run locally

You can open `index.html` directly in a browser to see event cards using the embedded data. Browsers block fetching local data files from a `file://` URL, so the XML title and the latest `events.json` data require a local web server.

To load the data files, start a local web server from this folder:

```powershell
py -m http.server 8765
```

Then open http://localhost:8765/ in a browser. The page fetches `events.json` for event cards and `events.xml` to display the first XML event title. When changing events, update both files and the embedded event data in `index.html`. No build step or package installation is required.

## GitHub Pages

The site is published from the repository's `main` branch. Pushing updates to the site files republishes it automatically. GitHub Pages serves the page over HTTP, so it can load `events.json`.
