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

Open `http://127.0.0.1:4173`. Keep the terminal open while using the site and press Ctrl+C to stop it. If the port is already in use, set `PORT` to another available port from 1 to 65535 before starting. The development server binds only to localhost and does not cache files. It is not a production hosting service.

Deploy `index.html` and the `assets` directory together on a static host. Asset URLs are relative, so the site also works under a GitHub Pages project path such as `/Portfolio/`. Google Fonts is optional; system font fallbacks keep the page usable without external network access.

## CV source

The published `assets/docs/CV.pdf` is included and can be viewed without installing a LaTeX toolchain. Tectonic is needed only when recompiling the canonical source, `assets/docs/CV.tex`; its first run needs internet access to download packages and fonts. See [the CV compilation instructions](assets/docs/README.md), and inspect the result before replacing the published PDF.

The terminal, background hardware graphics, and assistant text are local illustrations. They do not execute firmware, contact a chatbot service, or make live hardware measurements.
