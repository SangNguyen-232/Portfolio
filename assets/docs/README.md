# Compiling the CV

`CV.tex` is the canonical CV source. Make all changes to content, layout, fonts, or links in this file. `CV.pdf` is the compiled output; do not edit the PDF directly.

With [Tectonic](https://tectonic-typesetting.github.io/book/latest/installation/) available on PATH, run the following command from the Portfolio root directory:

```powershell
tectonic --untrusted --outdir assets/docs assets/docs/CV.tex
```

Tectonic downloads the required packages and fonts on its first run. If you use a portable version, replace `tectonic` with the path to the executable.

After compiling, read the log and visually inspect every PDF page before using the document. Do not overlay text, edit content streams, or move link annotations in the PDF; update the LaTeX source and recompile instead.
