<div align="center">
  <img width="900" alt="Tasleema preview" src="https://i.postimg.cc/TP4bmjXP/Screenshot-2025-11-07-095822.png" />

  # Tasleema

  **The calmest way to turn a prompt into a presentation-ready report.**
</div>

Tasleema is an AI report studio that accepts a short brief, renders a polished PDF preview instantly, and still lets you download the editable source when needed. No LaTeX knowledge, no desktop tooling, and no logins required—just describe the intent, choose the tone, and iterate until it looks right.

---

## Highlights

- **Human-ready home page.** The refreshed hero section introduces Tasleema’s value, showcases live stats, and explains exactly what happens when you click *Start with Tasleema*.
- **Guided storytelling.** Benefit cards highlight context awareness, layout presets, and the instant preview so new users know what to expect.
- **Live PDF canvas.** The right column of the hero mirrors the in-app preview card so users immediately understand they’ll see the finished PDF instead of raw code.
- **One-click actions.** Consistent CTAs scroll directly to the creation form, while the footer and metadata now reference the Tasleema brand everywhere (package name, title, manifest, etc.).

---

## How Tasleema Works

1. **Describe the report.** Provide author information, language, and the core topic.
2. **Tune the tone.** Select length, cover format, and report style; use the AI refiner for clearer prompts.
3. **Generate & preview.** Tasleema compiles the LaTeX source in the background and streams a PDF preview right in the browser.
4. **Download what you need.** Grab the polished PDF or the editable `.tex` source without leaving the page.

---

## Tech Stack

| Layer | Details |
|-------|---------|
| UI | React 18 + TypeScript + Tailwind CSS |
| Build | Vite 6 with ES modules |
| AI | Google Gemini API for content + structure generation |
| Preview | LaTeX-on-HTTP service for PDF compilation |

---

## Getting Started

```bash
git clone https://github.com/your-username/tasleema.git
cd tasleema
pnpm install   # or npm install / yarn
```

Create a `.env.local` file:

```bash
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

Run the dev server:

```bash
pnpm dev
```

Build + preview production output:

```bash
pnpm build
pnpm preview
```

---

## Available Scripts

- `pnpm dev` – Vite dev server with hot reload.
- `pnpm build` – Production build.
- `pnpm preview` – Preview the production bundle locally.
- `pnpm test` – Placeholder script (update when tests are added).

---

## Configuration

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Required. Tasleema uses this key to talk to the Gemini API. |
| `VITE_TEX_COMPILE_ENDPOINT` | Optional override for the LaTeX compilation endpoint. Defaults to `https://latex.ytotech.com/builds/sync`. |

---

## Project Structure

```
tasleema/
├── App.tsx                # Home layout + routing for generator studio
├── components/            # UI building blocks (forms, preview, icons, settings)
├── contexts/              # Language provider
├── services/              # Gemini + PDF compilation helpers
├── index.html             # Root document (now branded for Tasleema)
├── i18n.ts                # English + Arabic copy
├── package.json           # Scripts & dependencies
└── README.md              # You are here
```

---

## Deployment

Tasleema ships as a static site:

1. Build with `pnpm build` (output lands in `dist/`).
2. Deploy the `dist` folder to Netlify, Vercel, GitHub Pages, or any static host.
3. Provide the `GEMINI_API_KEY` (and optional compilation endpoint) as environment variables on your host.

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/amazing-idea`.
3. Make your changes and run `pnpm tsc --noEmit`.
4. Commit + push, then open a Pull Request.

Bug reports and feature ideas are always welcome through GitHub Issues.

---

## License

Released under the [MIT License](LICENSE).

---

Have fun building with Tasleema! If the project helps you ship faster, please consider giving it a ⭐️.
