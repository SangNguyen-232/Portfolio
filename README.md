# Nguyen Van Sang Portfolio

A static, bilingual portfolio built with HTML, CSS, and browser JavaScript. The site has no runtime package dependencies and does not require a frontend compilation step. Keep comments and documentation in English; the English and Vietnamese interface translations are intentional.

New to the project? Follow the [complete setup and usage guide](GUIDE.md).

Before sharing changes, follow the guide's [syntax and manual checks](GUIDE.md#12-check-the-project-before-sharing-changes). The project does not include an automated test or lint script.

## Run locally

Install Node.js 20 or later, then open a terminal in the cloned `Portfolio` directory and run:

```sh
npm start
```

No `npm install` or build command is needed: the server uses only Node.js built-in modules. In Windows PowerShell, use `npm.cmd start` if the execution policy blocks the `npm.ps1` wrapper. You can also start the same server directly with `node scripts/serve.mjs`.

Open `http://127.0.0.1:4173`. Keep the terminal open while using the site and press Ctrl+C to stop it. If Windows asks `Terminate batch job (Y/N)?`, enter `Y`. If the port is already in use, set `PORT` to another available port from 1 to 65535 before starting. The development server binds to localhost and sends `Cache-Control: no-store`.

Deploy `index.html` and the `assets` directory together on a static host. Asset URLs are relative, so the site also works under a GitHub Pages project path such as `/Portfolio/`. Google Fonts is optional; system font fallbacks keep the page usable without external network access.

## Explore the site

The terminal-style panel introduces the candidate. The animated hardware graphics and the About section’s predefined profile text run locally in the browser. No physical board or external service is required.

Open **System architecture** on the IoT-Env-Monitor card to trace a measurement from the DHT20 to the fan relay and follow links to the implementation. **RTL & LCD controller** traces an FPGA purchase, and **Process flow** shows how ParkWise settles parking fees and generates receipts. Scroll within each dialog to read all its sections.

## CV source

The published `assets/docs/CV.pdf` is included and can be viewed without installing a LaTeX toolchain. To change the CV, edit `assets/docs/CV.tex`, rebuild it with Tectonic and inspect the resulting PDF. The first compilation needs internet access to download packages and fonts. [CV compilation instructions](assets/docs/README.md)
