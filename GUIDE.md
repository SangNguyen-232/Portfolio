# Portfolio: Setup and Usage Guide

This guide explains how to download, run, edit, and prepare this portfolio for static hosting. Run the commands from a terminal, not from the browser address bar. All commands after cloning assume that the terminal is inside the `Portfolio` directory containing `package.json` and `index.html`.

## Contents

1. [Understand the project](#1-understand-the-project)
2. [Install the required tools](#2-install-the-required-tools)
3. [Clone the repository](#3-clone-the-repository)
4. [Run, stop, and reopen the site](#4-run-stop-and-reopen-the-site)
5. [Use the portfolio interface](#5-use-the-portfolio-interface)
6. [Find and edit the source files](#6-find-and-edit-the-source-files)
7. [Update the CV](#7-update-the-cv)
8. [Prepare for static hosting](#8-prepare-for-static-hosting)
9. [Update your local copy safely](#9-update-your-local-copy-safely)
10. [Troubleshoot common problems](#10-troubleshoot-common-problems)
11. [Keep source files and exclude temporary output](#11-keep-source-files-and-exclude-temporary-output)
12. [Check the project before sharing changes](#12-check-the-project-before-sharing-changes)

## 1. Understand the project

This is a static website. HTML defines its content and structure, CSS controls its appearance, and browser JavaScript provides language switching, dialogs, navigation, and animations. There is no React, Next.js, database, account system, or backend API to configure for this repository.

Node.js runs the small local HTTP server in `scripts/serve.mjs`. The server uses Node.js built-in modules and serves `index.html` and files under `assets/`. There are no npm dependencies to install and no frontend compilation step. The only npm script is `start`; `npm install`, `npm ci`, and `npm run build` are not setup steps for this project.

The terminal output, hardware graphics, and assistant text are browser demonstrations. Their displayed commands do not execute firmware or shell commands, and the assistant does not contact an AI service.

## 2. Install the required tools

| Tool or technology | Required? | Purpose |
| --- | --- | --- |
| Git | Yes for the clone/update workflow below | Download the repository and inspect updates. |
| Node.js 20 or later | Yes for the supplied local server | Run `scripts/serve.mjs`; the installer normally also provides npm. |
| A current web browser with JavaScript enabled | Yes | Open and use the website. |
| HTML, CSS, and JavaScript | Already included as source | These are the website technologies, not additional programs to install. |
| A text editor, such as Visual Studio Code | Optional for viewing; useful for editing | Edit the source files. |
| Tectonic | Only when rebuilding the CV | Convert the LaTeX source into the published PDF. |

Install Git using the instructions for your operating system on the [official Git installation page](https://git-scm.com/install/). Install a maintained Node.js LTS release that satisfies the project's `>=20` requirement from the [official Node.js download page](https://nodejs.org/en/download). Choose the installer or installation method appropriate for your operating system and processor.

Node.js 26.13.1 was used for the current local validation. The package's minimum of Node.js 20 is a compatibility requirement, not a recommendation to install an unsupported release.

After installation, close and reopen the terminal so that updated executable paths take effect. In Windows PowerShell, check:

```powershell
git --version
node --version
npm.cmd --version
```

In macOS Terminal or a Linux shell, check:

```sh
git --version
node --version
npm --version
```

Each command should print a version. If a command is not found, finish installing that tool and correct its `PATH` before continuing. You do not need a particular npm version for this dependency-free server. If npm is unavailable but Node.js works, use the direct Node.js command in section 4.

Use an up-to-date browser already installed on your computer, or install one from its official site, such as [Firefox](https://www.mozilla.org/firefox/new/). You can install [Visual Studio Code](https://code.visualstudio.com/download) or use another editor. Editor extensions are optional. For CV changes, follow the [official Tectonic installation instructions](https://tectonic-typesetting.github.io/book/latest/installation/); you can skip Tectonic entirely when just running the website or viewing its existing PDF.

## 3. Clone the repository

Open a terminal in the parent folder where you want to keep your projects. Run:

```sh
git clone https://github.com/SangNguyen-232/Portfolio.git
cd Portfolio
```

`git clone` creates the `Portfolio` folder; `cd Portfolio` enters it. If that folder already exists and contains your copy, enter the existing folder instead of cloning over it. Internet access and access to the repository are required for cloning.

The project root should contain `index.html`, `package.json`, `README.md`, `GUIDE.md`, `assets`, and `scripts`. In an editor, open this folder as the workspace. If using Visual Studio Code, its **File > Open Folder** command works without requiring the optional `code` terminal command.

Do not run the project commands from the parent folder or from `assets`. If you see an error saying that `package.json` or `scripts/serve.mjs` cannot be found, check the current directory with `Get-Location` in PowerShell or `pwd` on macOS/Linux.

## 4. Run, stop, and reopen the site

### Windows PowerShell

From the `Portfolio` root:

```powershell
npm.cmd start
```

Using `npm.cmd` avoids PowerShell's `npm.ps1` execution-policy restriction without changing your machine's execution policy.

### macOS and Linux

From the `Portfolio` root:

```sh
npm start
```

### Direct command on any platform

This starts the same server without the npm wrapper:

```sh
node scripts/serve.mjs
```

Choose one of these commands. Keep its terminal open and visit [the local portfolio](http://127.0.0.1:4173) in your browser. The terminal should display `Portfolio: http://127.0.0.1:4173`. The server binds to the local computer only; it does not make the site accessible to other devices on your network.

Press **Ctrl+C** in the server terminal to stop it. To use the project again later, open a terminal in the same `Portfolio` folder and run the same start command. You do not need to clone or install anything again.

### Use a different port

The default port is `4173`. If it is occupied, first stop your previous Portfolio server if it is still running, or choose another available port such as `4174`. Prefer a non-privileged port, normally `1024` to `65535`; although the server accepts `1` to `65535`, lower ports may require additional operating-system privileges.

In PowerShell, set `PORT` for the current terminal and start the server:

```powershell
$env:PORT = '4174'
npm.cmd start
```

Open `http://127.0.0.1:4174`. After stopping the server with Ctrl+C, remove the override and restart on the default port:

```powershell
Remove-Item Env:PORT
npm.cmd start
```

The environment change above affects this terminal and its child processes, not the system-wide configuration. Closing this terminal also discards its override.

In a macOS/Linux shell, scope the override to a single command:

```sh
PORT=4174 npm start
```

After Ctrl+C, `npm start` uses the default again unless you had already exported `PORT` elsewhere. To remove an exported override in the current shell:

```sh
unset PORT
npm start
```

## 5. Use the portfolio interface

- Use the navigation links to move between the summary, projects, skills, experience, education, and contact sections. On narrower screens, open the navigation menu with its menu button.
- Use the language button to switch between English and Vietnamese. Both interface translations are intentional. The browser stores the language preference when local storage is available.
- Open the architecture/details buttons on project cards to read the project dialogs. Use the close button, click the backdrop, or press Escape to close a dialog. Keyboard Tab navigation stays within an open dialog.
- Click the terminal command chips to display local diagnostic demonstrations: help, FreeRTOS tasks, TinyML inference, FPGA state-machine output, and clear. These are clickable simulations, not a general-purpose terminal input.
- Use the assistant's regenerate button to replay its predefined profile text in the selected language. No account or API key is needed.
- Move the mouse across the **about me** and **profile.json** cards to see them tilt slightly and highlight their borders. The cards settle back when the pointer leaves. On touch-only devices or with reduced motion enabled, the cards stay level.
- Use **View CV** to open `assets/docs/CV.pdf`. A browser may display it in a PDF viewer or offer a download according to its settings.

The keyboard shortcuts are:

| Key | Action |
| --- | --- |
| `L` | Switch the interface language. |
| `B` | Toggle the animated LED borders. |
| `T` | Move to and focus the firmware terminal region. |
| `P` | Move to the projects section. |
| `Escape` | Close an open dialog or the mobile menu. |
| `?` | Open or close the shortcut guide. |

Letter shortcuts are ignored while typing in a form field or editable content and while another dialog is open. The language and LED preferences use local storage; when storage is blocked, the code falls back to memory for the current page. The page also responds to the operating system/browser reduced-motion preference, so some animations may be shortened or absent.

Google Fonts is optional. If external font requests fail, the site uses its configured fallback fonts. External GitHub, LinkedIn, email, and telephone links depend on their destination or the applications configured on your device.

## 6. Find and edit the source files

```text
Portfolio/
  index.html
  package.json
  README.md
  GUIDE.md
  .gitignore
  scripts/
    serve.mjs
  assets/
    css/
      variables.css
      base.css
      components.css
      sections.css
      effects.css
      upgrade.css
      redesign.css
      redesign3d.css
    js/
      i18n.js
      scope.js
      terminal.js
      main.js
    images/
      anh-the-trang.webp
    docs/
      CV.tex
      CV.pdf
      README.md
```

| Change you want to make | File or directory to edit |
| --- | --- |
| Page sections, links, metadata, and initial HTML content | `index.html` |
| English/Vietnamese interface strings and project dialog content | `assets/js/i18n.js` |
| Colors and shared design variables | `assets/css/variables.css` |
| Layout and appearance | The relevant file in `assets/css/`; check the stylesheet order in `index.html`. |
| Navigation, storage preferences, keyboard shortcuts, and dialogs | `assets/js/main.js` |
| Simulated terminal output and assistant stream behavior | `assets/js/terminal.js` |
| Canvas/hardware-style background effects | `assets/js/scope.js` |
| Portrait | `assets/images/anh-the-trang.webp` and its references/alternative text if renamed |
| CV content and layout | `assets/docs/CV.tex`, then rebuild `CV.pdf` |
| Local HTTP serving behavior | `scripts/serve.mjs` |

Keep code comments and documentation in English. Preserve the deliberate English and Vietnamese interface translations. For an element with a `data-i18n` attribute, changing only its text in `index.html` is not enough: the language system replaces it with the corresponding dictionary value. Update the relevant English and Vietnamese keys in `i18n.js`, and keep the HTML fallback text consistent. Project dialog bodies also have separate language versions in that file.

Keep the original ParkWise project title on the card, in the project dialog and in the CV. The technology list describes the team project. Check the app imports, shared UI components, Express server, SQL scripts and build configuration when updating it. The PostgreSQL schema and seed scripts are standalone examples. The running application uses browser storage and in-memory data. See the [ParkWise repository](https://github.com/SangNguyen-232/ParkWise).

Sang's contribution is UC2. For descriptions of the account dashboard, fee payments, history filters and PDF receipts, check `app/dashboard/page.tsx`, `app/payment/page.tsx`, `app/history/page.tsx`, their API routes and `lib/receipt-pdf.ts` in the UC2 checkout (under `ParkWise/UC2/btl_CNPM` in this workspace).

Keep file names and capitalization consistent in all references. Use relative asset paths such as `assets/images/anh-the-trang.webp` rather than paths beginning with `/`; this allows the site to work beneath a project URL prefix.

Save the file and refresh the browser to see HTML, CSS, JavaScript, or image changes. The local server sends `Cache-Control: no-store`, but it does not automatically reload the browser. Restart the server after changing `scripts/serve.mjs` or its startup environment. Review both languages, project dialogs, navigation, and the CV link after content changes.

## 7. Update the CV

The existing `assets/docs/CV.pdf` is a published website asset. Keep it in the project: the **View CV** links depend on it. Installing Tectonic is not required to view it.

To change the CV, edit the canonical source `assets/docs/CV.tex`. Read [the repository's CV instructions](assets/docs/README.md) before compiling. With Tectonic installed and available on `PATH`, run from the `Portfolio` root:

```sh
tectonic --version
tectonic --untrusted --outdir assets/docs assets/docs/CV.tex
```

The second command rebuilds `assets/docs/CV.pdf` at the path used by the website. Preserve your current source and PDF before replacing a version you need to keep. If you installed a portable executable outside `PATH`, replace `tectonic` with its executable path; in PowerShell a quoted executable path is invoked with `&`, for example `& "C:\Tools\tectonic\tectonic.exe" --version` after adjusting that example to your installation.

Tectonic downloads and caches supporting files on its first run, so that run needs network access. Subsequent runs can reuse the cache. See the [official explanation of first-run downloads and caching](https://tectonic-typesetting.github.io/book/latest/getting-started/first-document.html).

Read the compiler output and inspect every page of the resulting PDF. Check line wrapping, margins, icons, text, and links; a successful compiler exit alone does not verify the layout. Edit the LaTeX source and compile again if needed. Do not patch text or link annotations directly inside the PDF. Refresh the website's CV viewer after replacement, or reopen it if the viewer retains the old document.

## 8. Prepare for static hosting

The website can be hosted as static files. Its deployment content is `index.html` plus the complete `assets` directory, with the same relative layout. There is no generated `dist` or build-output directory to upload, and the Node.js development server does not need to run on a static host.

Before publishing your own copy, review personal details, contact links, repository links, and the absolute social-preview URLs in `index.html`. Configure them for your intended public site. Keep `assets/docs/CV.pdf` alongside the other assets.

For GitHub Pages, choose a publishing source containing `index.html` at its root and include `assets` beneath it. Follow the [official GitHub Pages setup instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) for the hosting configuration. The relative asset paths support a project prefix such as `/Portfolio/`. The local development URL remains `http://127.0.0.1:4173/`, without that prefix.

Cloning the repository or starting the local server does not publish a website. Hosting access, repository permissions, and the selected publishing configuration determine whether a deployment can proceed. This guide does not assert that a particular remote deployment is currently active.

## 9. Update your local copy safely

You can reopen and run the existing clone without contacting GitHub. Fetching new source changes is a separate action.

Before updating, stop the local server and inspect your work from the repository root:

```sh
git status --short
git diff
```

`git status` also lists untracked files; `git diff` does not show their contents. Save a separate backup or commit the changes you want to keep before integrating remote updates. Once your working tree is clean and your current branch has an upstream, update with:

```sh
git pull --ff-only
```

If Git reports local changes, conflicts, or diverging history, inspect that situation before proceeding. Do not delete the folder, use a hard reset, or discard files just to force an update. After an update, review any changed prerequisites and run the start command again. No dependency installation is needed while the project remains dependency-free.

## 10. Troubleshoot common problems

| Symptom | What to check |
| --- | --- |
| Cloning reports a missing repository or denied access | Check the clone URL, network connection, and your account's repository access. If authentication is required, follow [GitHub's cloning troubleshooting guidance](https://docs.github.com/en/repositories/creating-and-managing-repositories/troubleshooting-cloning-errors). |
| `git` or `node` is not recognized | Install the tool, reopen the terminal, and check its executable search path. |
| PowerShell blocks `npm.ps1` | Use `npm.cmd start` or `node scripts/serve.mjs`; changing the execution policy is unnecessary. |
| npm cannot find `package.json` | Enter the cloned `Portfolio` root before running the command. |
| `Cannot find module .../scripts/serve.mjs` | Check your working directory and confirm that `scripts/serve.mjs` is present in the clone. |
| Port/address already in use | Stop the previous server or select an available port using section 4. Open the URL for the port actually printed by the server. |
| Invalid `PORT` error | Use an integer from `1` to `65535`, or remove the override to restore `4173`. |
| The browser cannot connect | Keep the server terminal running, read its error output, and use `http://127.0.0.1:<port>/` on the same computer. |
| A request for `GUIDE.md` or `package.json` returns 404 | The supplied local server intentionally serves only `index.html` and `assets/`. Open project documentation in your editor or repository viewer. |
| Fonts differ or an external font request fails | Google Fonts may be unavailable on the current connection. The configured system-font fallbacks keep the page usable. |
| Saved edits are not visible | Save the file, refresh the correct local URL, and check that you are editing the clone served by that terminal. For translated text, update `i18n.js` as well as the HTML fallback. |
| Language or LED choice does not survive a reload | Browser storage may be blocked or cleared. Check browser permissions; in-memory fallback lasts only for the current page. |
| Animation is reduced or absent | Check the reduced-motion preference and whether LED borders were switched off with `B`. |
| An image, script, or CV link returns 404 | Compare the path and capitalization with the actual file. Preserve the `assets` hierarchy when copying or deploying. |
| CV compilation fails to download files | Check the network/proxy connection and Tectonic installation. The website can still serve the existing PDF. |
| CV compilation reports a warning or the PDF looks wrong | Read the diagnostic, inspect the output, and correct the LaTeX source or tool installation as appropriate; do not suppress warnings as a substitute for checking the result. |

Use the browser's developer tools Console and Network panels to inspect actual runtime errors or failed requests. This repository has no bundled automated test command; use the page controls and inspect the relevant files when checking your changes.

## 11. Keep source files and exclude temporary output

Keep `index.html`, `package.json`, `scripts/serve.mjs`, documentation, images, CSS, JavaScript, and the CV source/PDF pair. The existing `.gitignore` excludes local dependency directories, test/coverage reports, common editor files, and LaTeX intermediate files such as `.aux`, `.log`, and `.xdv`.

The ignored names do not mean you need to create those directories or install a test framework. No `node_modules` directory, generated audit report, or browser-test toolchain is needed to run this site. Keep optional Tectonic downloads and caches outside the website's published assets. Do not delete `CV.pdf` merely because it is compiled: it is an intentional published asset.

## 12. Check the project before sharing changes

The repository has no `test`, `lint`, or `build` npm script and no bundled browser-test runner. Run the following syntax checks from the `Portfolio` root in PowerShell, macOS Terminal, or a Linux shell:

```sh
node --check scripts/serve.mjs
node --check assets/js/i18n.js
node --check assets/js/main.js
node --check assets/js/scope.js
node --check assets/js/terminal.js
git diff --check
```

A successful syntax check prints nothing and exits with status `0`; otherwise, read the reported file and line number, correct the problem, and rerun that command. `git diff --check` reports whitespace errors in tracked changes. Review new, untracked files separately because that command does not include them. These checks do not execute the browser code or validate page appearance.

Start the server as described in section 4, then follow this manual check:

1. Open the URL printed by the server and confirm that the page, portrait, styles, and icons load. In the browser's Network panel, check that local CSS, JavaScript, image, and PDF requests succeed.
2. Follow the navigation links on both a wide window and a narrow/mobile-sized window. Open and close the mobile menu and confirm that the page can still scroll.
3. Switch between English and Vietnamese. Check the section titles, project text, and project detail dialogs in both languages. Reload the page and confirm the language preference persists when browser storage is allowed.
4. Open each project dialog. Use Tab and Shift+Tab to move among its controls, then close it with Escape and with its close button. Check the shortcut guide with `?` and the `L`, `B`, `T`, and `P` shortcuts when no dialog is open.
5. Click each terminal command chip, including clear, and replay the assistant text. Confirm that the local demonstrations complete without uncaught errors in the browser Console.
6. Open **View CV** and inspect the PDF. After any CV source change, recompile it and inspect every page as described in section 7.
7. Enable the operating system or browser's reduced-motion preference, reload the page, and confirm that navigation and content remain usable. Restore your preferred setting afterward.
8. Stop the server with Ctrl+C, restart it, and reopen the printed URL. If you changed the port, use the matching URL.

For a quick HTTP check while the server is running, open a second terminal. In PowerShell, run:

```powershell
(Invoke-WebRequest -UseBasicParsing 'http://127.0.0.1:4173/').StatusCode
(Invoke-WebRequest -UseBasicParsing 'http://127.0.0.1:4173/assets/docs/CV.pdf' -Method Head).StatusCode
```

Both commands should print `200`. On macOS/Linux, if `curl` is installed, use:

```sh
curl --head http://127.0.0.1:4173/
curl --head http://127.0.0.1:4173/assets/docs/CV.pdf
```

Both responses should begin with `HTTP/1.1 200 OK`. Replace `4173` in these commands if you selected another port. An HTTP success confirms that a file is served; use the browser checks above to assess interactive behavior and layout.

During the documentation review, all five syntax checks and `git diff --check` passed under Node.js 26.13.1. HTTP checks also confirmed successful delivery of the page, JavaScript, CSS, portrait, and CV, empty response bodies for `HEAD`, and the documented restriction on serving root documentation. This does not claim a completed browser interaction or CV compilation test.
