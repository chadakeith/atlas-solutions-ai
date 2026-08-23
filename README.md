# Atlas Google Site

Starter kit for the Atlas Carolina site hosted on **Google Sites**.

## How this works

Google Sites doesn't host code files — you build pages in its drag-and-drop
editor at [sites.google.com](https://sites.google.com), and custom HTML is
added through **Embed blocks**. This repo keeps the site's custom HTML under
version control so sections can be edited here, previewed, and then pasted
into the Google Site.

## Repo layout

| File | Purpose |
|------|---------|
| `index.html` | The full site in one page — open it in a browser to preview the whole design before touching Google Sites. |
| `embeds/hero.html` | Hero banner section (self-contained, paste into an Embed block). |
| `embeds/about.html` | About section. |
| `embeds/services.html` | Three-card services section. |
| `embeds/contact.html` | Contact / call-to-action section. |

Each file in `embeds/` is fully self-contained (all styles inline) because
Google Sites renders each Embed block in its own isolated iframe — embeds
can't share a stylesheet.

## Setting up the Google Site (one-time)

1. Go to [sites.google.com](https://sites.google.com) and click **Blank site** (+).
2. Name the site (top-left) — e.g. *Atlas Carolina*.
3. Delete the default header banner if you want the custom hero instead
   (hover over it → delete), or keep it and skip the hero embed.
4. For each section:
   - **Insert → Embed → Embed code** (second tab, "Embed code").
   - Paste the entire contents of one file from `embeds/` and click **Next → Insert**.
   - Drag the block to full width and stretch its height until nothing is cut off.
5. Repeat in order: `hero.html`, `about.html`, `services.html`, `contact.html`.
6. Click **Publish** (top-right), choose a web address
   (e.g. `sites.google.com/view/atlascarolina`), and publish.

### Custom domain (optional, later)

Publish settings → **Custom domains** lets you map something like
`www.atlascarolina.com` to the site. It walks you through verifying the
domain and adding a CNAME record at your DNS provider.

## Making changes

1. Edit the relevant file in `embeds/` (and mirror the change in `index.html`
   so the preview stays accurate).
2. Preview `index.html` in a browser.
3. In Google Sites, click the embed block → the pencil (edit) icon → replace
   the code with the updated file contents.
4. **Publish** again to push the change live.

## Tips

- Google Sites embeds are sandboxed iframes: keep everything inline
  (styles and any future scripts) inside each embed file.
- Mixing is fine — use native Google Sites text/image blocks for simple
  content and Embed blocks only where you want custom styling.
- Colors used: navy `#16324f`, teal `#2d8f8f`, light gray `#f5f7fa`.
  Change them consistently across files to re-theme the site.
