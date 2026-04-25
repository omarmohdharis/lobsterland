# 🦞 Lobster Land — Stay & Play

A static GitHub Pages site showcasing our AD654 Marketing Analytics consulting project for Lobster Land's "Stay & Play" lodging initiative.

**Live site:** _add your GitHub Pages URL here once deployed_

## What's inside

- `index.html` — single-page site with hero, segmentation, conjoint, classification, A/B testing, and team sections
- `styles.css` — lobster-red + ocean palette, dark mode, animations, fully responsive
- `script.js` — animated counters, scroll progress, theme toggle, scroll reveals, floating mascot, and one easter egg (try typing **lobster** anywhere on the page 🦞)

## Project sections

| Section | Description |
|---|---|
| Overview | The brief and why Lobster Land is exploring lodging |
| Segmentation | Four K-Means guest personas with targeting priorities |
| Conjoint | The recommended ~$148 package built under the $150 cap |
| Classification | Logistic Regression vs Random Forest comparison |
| A/B Test | Four candidate hero photos for the launch campaign |
| Team | Project contributors |

## Run it locally

You can just open `index.html` in any browser. Or for a proper local server:

```bash
# Python 3
python -m http.server 8000

# Or with Node
npx serve .
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages

1. Create a new public repo on GitHub (e.g., `lobster-land-stayplay`).
2. In VS Code, open this folder and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Lobster Land Stay & Play site"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<REPO-NAME>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `(root)` → Save**.
4. Wait ~1 minute. Your site will be live at `https://<YOUR-USERNAME>.github.io/<REPO-NAME>/`.

## Customizing

- **Team names** — edit the `.team-card` blocks in `index.html` (search for `Teammate`).
- **Numbers in hero stats** — adjust the `data-target` attributes on `.stat-num` divs.
- **Colors** — all theme colors live as CSS variables in `:root` at the top of `styles.css`.
- **Add real photos for A/B test** — replace the `.photo-emoji` divs with `<img>` tags. Drop images in an `assets/` folder.
- **Link to your notebook / Tableau dashboard** — add anchor tags in the relevant sections, e.g., in the conjoint or classification section.

## Stack

Pure HTML / CSS / vanilla JS — no build step, no dependencies. Just push and go.

---

AD654 · Spring 2026 · Boston University
